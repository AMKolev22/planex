#pragma once

#define CLIENT_PORT 12345
#define SERVER_PORT 54321

#define ENABLE_ALLOC false // ne go baraite brat
#define MAX_SIZE_DEFAULT (1024*512) // IF ABOVE IS ENABLED 

#define MEMORY_FLAGS_CONFIG ( HEAP_GENERATE_EXCEPTIONS, HEAP_NO_SERIALIZE, HEAP_ZERO_MEMORY, HEAP_CREATE_ENABLE_TRACING )