#ifndef AES_H
#define AES_H

#include <stdint.h>

// AES key size in bits (128, 192, or 256)
#define AES_KEY_SIZE 256

// Encrypt plaintext (in-place) using AES
void aes_encrypt(uint8_t *data, size_t length, const uint8_t *key);

// Decrypt ciphertext (in-place) using AES
void aes_decrypt(uint8_t *data, size_t length, const uint8_t *key);

#endif // AES_H
