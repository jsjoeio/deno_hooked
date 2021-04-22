import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  test,
} from "./mod.ts";

let quiet = false;
try {
  quiet = Deno.env.get("QUIET") === "1";
} catch {}

const encoder = new TextEncoder();
function log(...strs: string[]): void {
  if (quiet) {
    return;
  }

  const msg = " '" + strs.join(" ") + "' ";
  Deno.stdout.writeSync(encoder.encode(msg));
}

beforeAll(() => {
  log("before all global");
});

beforeAll(() => {
  log("second before all global");
});

beforeEach(() => {
  log("before each global");
});

afterEach(() => {
  log("after each global");
});

afterAll(() => {
  log("after all global");
});

test("1", () => {
  log("1");
});

test({
  name: "2",
  fn() {
    log("2");
  },
  ignore: true,
});

test("3", async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  log("3");
});

describe("describe 1", () => {
  beforeAll(() => {
    log("before all describe 1");
  });

  beforeEach(() => {
    log("before each describe 1");
  });

  afterEach(() => {
    log("after each describe 1");
  });

  afterAll(() => {
    log("after all describe 1");
  });

  test("1", () => {
    log("1");
  });

  test({
    name: "2",
    fn() {
      log("2");
    },
    ignore: true,
  });

  test("3", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    log("3");
  });
});

describe("describe 2", () => {
  beforeAll(() => {
    log("before all describe 2");
  });

  beforeEach(() => {
    log("before each describe 2");
  });

  afterEach(() => {
    log("after each describe 2");
  });

  afterAll(() => {
    log("after all describe 2");
  });

  test("1", () => {
    log("1");
  });

  describe("describe 3", () => {
    beforeAll(() => {
      log("before all describe 3");
    });

    beforeEach(() => {
      log("before each describe 3");
    });

    afterEach(() => {
      log("after each describe 3");
    });

    afterAll(() => {
      log("after all describe 3");
    });

    test("1", () => {
      log("1");
    });

    test({
      name: "2",
      fn() {
        log("2");
      },
      ignore: true,
    });

    test("3", async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      log("3");
    });
  });

  test("3", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    log("3");
  });
});
