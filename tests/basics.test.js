const server = require("../src/server");

describe("Basic behaviour", () => {
  test("Opens a connection", () => {
    expect(() => {
      const s = server({ port: 7021 });
      s.close();
    }).not.toThrow();
  });

  test("Opens a ssl connection", () => {
    expect(() => {
      const s = server({ port: 7021, ssl: true });
      s.close();
    }).not.toThrow();
  });

  /*   test("Connecting to an already open port, throws", async () => {
    let s1, s2;
    s1 = server({ port: 7025 });

    expect(() => {
      //s2 = server({ port: 7024 });
    }).toThrow();

    s1.close();
    s2.close();
  }); */
});
