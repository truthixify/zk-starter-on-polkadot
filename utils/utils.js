export const bigintToUint8Array = bigInt => {
    // Take the modulus of bigInt with respect to the field size
    bigInt = bigInt % BigInt(FIELD_SIZE.toString())

    // Create a buffer large enough to hold 32 bytes (256 bits)
    const buffer = new ArrayBuffer(32)
    const view = new DataView(buffer)

    // Write the BigInt into the buffer as bytes
    for (let i = 0; i < 32; i++) {
        view.setUint8(31 - i, Number(bigInt & BigInt(0xff))) // Mask to get the last byte and set it
        bigInt >>= BigInt(8) // Shift BigInt by 8 bits (1 byte) to process the next byte
    }

    return new Uint8Array(buffer)
}

export const uint8ArrayToBigInt = uint8Array => {
    // Convert Uint8Array to a hex string and then to BigInt
    let hexString = Buffer.from(uint8Array).toString('hex')

    return BigInt('0x' + hexString)
}
