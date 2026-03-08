from flask import Flask, request, render_template, send_file, redirect, url_for, flash
import qrcode
import io
import base64
import json
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.fernet import Fernet

app = Flask(__name__)
app.secret_key = 'change-me'  # for flashing messages

# derive a Fernet key from a password (UTF-8 string)
def derive_key(password: str, salt: bytes = b'smartqr') -> bytes:
    # PBKDF2 with SHA256
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=100_000,
    )
    return base64.urlsafe_b64encode(kdf.derive(password.encode()))

def generate_qr(data, fmt='PNG'):
    # helper: create QR image bytes from string data
    img = qrcode.make(data)
    buf = io.BytesIO()
    if fmt not in ('PNG','JPEG','JPG'):
        fmt = 'PNG'
    img.save(buf, format=fmt)
    buf.seek(0)
    mimetype = 'image/png' if fmt=='PNG' else 'image/jpeg'
    ext = 'png' if fmt=='PNG' else 'jpg'
    return buf, mimetype, ext

@app.route('/', methods=['GET', 'POST'])
def index():
    # this route handles generation of QR codes via form
    if request.method == 'POST':
        name = request.form.get('name','')
        phone = request.form.get('phone','')
        email = request.form.get('email','')
        age = request.form.get('age','')
        password = request.form.get('password','')
        fmt = request.form.get('format','PNG').upper()

        if not (name or phone or email or age):
            flash('Please provide at least one personal detail.')
            return redirect(url_for('index'))

        data_obj = {
            'name': name,
            'phone': phone,
            'email': email,
            'age': age,
        }
        data = json.dumps(data_obj)

        if password:
            key = derive_key(password)
            f = Fernet(key)
            data = f.encrypt(data.encode('utf-8')).decode('utf-8')

        buf, mimetype, ext = generate_qr(data, fmt)
        return send_file(buf, mimetype=mimetype, as_attachment=True, download_name=f'qr.{ext}')
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def api_generate():
    body = request.json or {}
    name = body.get('name','')
    phone = body.get('phone','')
    email = body.get('email','')
    age = body.get('age','')
    password = body.get('password','')
    fmt = body.get('format','PNG').upper()

    if not (name or phone or email or age):
        return {'error': 'Please provide at least one personal detail.'}, 400

    data_obj = {'name': name, 'phone': phone, 'email': email, 'age': age}
    data = json.dumps(data_obj)
    if password:
        key = derive_key(password)
        f = Fernet(key)
        data = f.encrypt(data.encode('utf-8')).decode('utf-8')

    buf, mimetype, ext = generate_qr(data, fmt)
    encoded = base64.b64encode(buf.getvalue()).decode('utf-8')
    return {'image': encoded, 'format': ext}

@app.route('/decrypt', methods=['GET', 'POST'])
def decrypt():
    # form-based decrypt page
    result = None
    if request.method == 'POST':
        encrypted = request.form.get('encrypted', '')
        password = request.form.get('password', '')
        if not encrypted:
            flash('Encrypted text is required.')
            return redirect(url_for('decrypt'))
        if password:
            try:
                key = derive_key(password)
                f = Fernet(key)
                decrypted = f.decrypt(encrypted.encode('utf-8'))
                result = decrypted.decode('utf-8')
            except Exception as e:
                flash(f'Failed to decrypt: {e}')
        else:
            result = encrypted
            try:
                obj = json.loads(encrypted)
                result = json.dumps(obj, indent=2)
            except Exception:
                pass
    return render_template('decrypt.html', result=result)

@app.route('/api/decrypt', methods=['POST'])
def api_decrypt():
    body = request.json or {}
    encrypted = body.get('encrypted', '')
    password = body.get('password', '')
    if not encrypted:
        return {'error': 'Encrypted text is required.'}, 400
    if password:
        try:
            key = derive_key(password)
            f = Fernet(key)
            decrypted = f.decrypt(encrypted.encode('utf-8'))
            result = decrypted.decode('utf-8')
        except Exception as e:
            return {'error': f'Failed to decrypt: {e}'}, 400
    else:
        result = encrypted
        try:
            obj = json.loads(encrypted)
            result = json.dumps(obj, indent=2)
        except Exception:
            pass
    return {'result': result}

if __name__ == '__main__':
    app.run(debug=True)

if __name__ == '__main__':
    app.run(debug=True)
