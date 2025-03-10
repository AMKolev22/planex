#include <cmath>
#include <iostream>
#include "windows.h"
#include <array>
#include "config.hpp"


#define buffer_var size_t
#define MATH_PI 3.1415926


//@brief -> class which includes a memory arena/custom malloc and new overload, and useful math definitions

namespace Utils {	

	class Memory {
	public:

		static constexpr int DEFAULT_SIZE = MAX_SIZE_DEFAULT;
		buffer_var size, move, byttesWritten;

		std::array<DWORD, 4> flags = { MEMORY_FLAGS_CONFIG };
		DWORD config = flags[0] | flags[1] | flags[2] | flags[3];

		HANDLE HEAP;

		Memory(buffer_var size) : size(size), move(0) {
			block = new char[size];
		};

		Memory() : size(DEFAULT_SIZE), move(0) {};

		~Memory() {
			delete block;
		}

		auto current() const {
			return this->size;
		}

		auto remaining() const {
			return (this->size - this->byttesWritten);
		}


		HANDLE createHeapObject(Utils::Memory& instance, const buffer_var* size) const;
		DECLSPEC_ALLOCATOR LPVOID allocate(Utils::Memory& instance, const buffer_var* size) const;
		auto destroyHeapObject(HANDLE& HEAP) const;
		auto deallocate(Utils::Memory& instance) const;
		

	protected:

		char* block;

		Memory(const Memory&) = delete;
		Memory& operator=(const Memory&) = delete;


	};

}