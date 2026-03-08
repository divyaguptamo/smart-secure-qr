#ifndef HISTORY_H
#define HISTORY_H

#include <stddef.h>

// Record a generated QR entry (encrypted data, timestamp, file path, etc.)
// Returns 0 on success.
int history_add(const char *entry);

// Retrieve history entries. Caller responsible for freeing returned array.
// "count" will be set to number of entries.
char **history_get(size_t *count);

// Free memory returned by history_get
void history_free(char **entries, size_t count);

#endif // HISTORY_H
