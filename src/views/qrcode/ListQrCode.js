import React from 'react';
import { QRCode } from 'react-qrcode-logo';

export default function ListQrCode() {
  const tableData = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return (
    <div>
      <h1>Table with QR Codes</h1>
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>
                <QRCode
                  value={JSON.stringify(row)} // Encode row data as QR code
                  size={64} // Set QR code size
                  fgColor="#000000" // Set QR code foreground color
                  bgColor="#FFFFFF" // Set QR code background color
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
