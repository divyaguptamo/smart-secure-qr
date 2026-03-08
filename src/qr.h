#ifndef QR_H
#define QR_H

#include <stdint.h>

// Generate a QR code bitmap from input data
// "data" should be a null-terminated string
// "output" buffer should be allocated by caller, width and height will be set
// Returns 0 on success, non-zero on error
int qr_generate(const char *data, uint8_t **output, int *width, int *height);

// Decode a QR code bitmap to a string
// "input" buffer holds the pixel data
// Returns a newly allocated string that must be freed by caller
char *qr_decode(const uint8_t *input, int width, int height);

#endif // QR_H
