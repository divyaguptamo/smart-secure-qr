# Simple Makefile for building Smart Secure QR Generator

CC = cl
CFLAGS = /EHsc /MD /I.
LDFLAGS = gdiplus.lib

SRCS = src\\main.c src\\aes.c src\\qr.c
OBJS = $(SRCS:.c=.obj)

all: SmartSecureQR.exe

SmartSecureQR.exe: $(OBJS)
	$(CC) $(CFLAGS) $(OBJS) $(LDFLAGS) /Fe$@

clean:
	del /Q $(OBJS) SmartSecureQR.exe
