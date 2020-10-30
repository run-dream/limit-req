/* tslint:disable */
const { app, assert } = require("midway-mock/bootstrap");
/* tslint:enable */

describe("test/app/controller/home.test.ts", () => {
  it("should assert", async () => {
    const pkg = require("../../../package.json");
    assert(app.config.keys.startsWith(pkg.name));
    // const ctx = app.mockContext({});
    // await ctx.service.xx();
  });

  it("should GET /api/index", () => {
    return app.httpRequest().get("/api/index").expect("index").expect(200);
  });
});
