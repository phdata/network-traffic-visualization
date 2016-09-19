
import java.io.*;
import java.net.*;

class UDPClient {
  public static void main(String args[]) throws Exception {
    File inputFile = new File(args[0]);
    DataInputStream inputStream = new DataInputStream(new FileInputStream(inputFile));
    DatagramSocket clientSocket = new DatagramSocket();
    InetAddress localhost = InetAddress.getByName("localhost");
    long start = System.currentTimeMillis();
    int count = 0;
    try {
      while (true) {
        int length = inputStream.readInt();
        byte[] data = new byte[length];
        inputStream.readFully(data);
        DatagramPacket sendPacket = new DatagramPacket(data, data.length, localhost, 9995);
        clientSocket.send(sendPacket);
        count++;
        Thread.sleep(60); // seems to send data at a good rate so
                          // the dataset s enough for a demo
      }
    } catch (EOFException e) {
      // ignored
    }
    System.out.println("sent " + count + " records, elapsed time: " + (System.currentTimeMillis() - start) + "ms");
  }
}

