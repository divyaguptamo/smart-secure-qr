#include "history.h"

int history_add(const char *entry)
{
    // TODO: append entry to persistent store (e.g., file or database)
    return -1;
}

char **history_get(size_t *count)
{
    // TODO: read entries from persistent store
    *count = 0;
    return NULL;
}

void history_free(char **entries, size_t count)
{
    // TODO: free memory
}
