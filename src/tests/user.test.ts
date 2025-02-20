import { UserService } from "../services/userServices";
import { TestDatabaseHandler } from "../helpers/testDatabaseHandler";
import { UserRepository } from "../database/repositories/UserRepository";
import { User } from "../schemas/userSchema";

describe("Users", () => {
  let testDataHandler: TestDatabaseHandler;
  let userService: UserService;

  beforeEach(async () => {
    testDataHandler = new TestDatabaseHandler();
    await testDataHandler.createDatabase();
    const userRepository = new UserRepository(testDataHandler.testDataSource);
    userService = new UserService(userRepository);
  });

  afterEach(async () => {
    await testDataHandler.dropDatabase();
  });

  it("should return a list of users", async () => {
    await userService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      password: "password",
    });
    const users = await userService.getAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0].first_name).toBe("John");
  });

  it("should return a single user if limit of 1 is passed into get all", async () => {
    await userService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      password: "password",
    });
    const users = await userService.getAllUsers(1);
    expect(users).toHaveLength(1);
  });

  it("should return a single user by id", async () => {
    await userService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      password: "password",
    });
    await userService.createUser({
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@doe.com",
      password: "password",
    });
    const user = await userService.getUserById(2);
    expect(user?.first_name).toBe("Jane");
    expect(user?.last_name).toBe("Doe");
    expect(user?.email).toBe("jane@doe.com");
  });

  it("should add a new user", async () => {
    const newUser = {
      first_name: "Keanu",
      last_name: "Reeves",
      email: "keanu@sharklasers.com",
      password: "password",
    };

    const addedUser = await userService.createUser(newUser);
    expect(addedUser.first_name).toBe("Keanu");
    expect(addedUser.last_name).toBe("Reeves");
    expect(addedUser.email).toBe("keanu@sharklasers.com");

    const users = await userService.getAllUsers();
    expect(users).toHaveLength(1);

    const user = await userService.getUserById(1);
    expect(user?.email).toBe("keanu@sharklasers.com");
  });

  it("should update a user", async () => {
    await userService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      password: "password",
    });
    const user = await userService.getUserById(1);
    const updatedUser = {
      userid: user?.userid,
      first_name: "Johnny",
      last_name: "Silverhand",
      email: "silverhand@scissors.com",
    };

    await userService.editUser(updatedUser as User);

    const user1 = await userService.getUserById(1);
    expect(user1?.first_name).toBe("Johnny");
    expect(user1?.last_name).toBe("Silverhand");
    expect(user1?.email).toBe("silverhand@scissors.com");
  });

  it("should delete a user", async () => {
    await userService.createUser({
      first_name: "John",
      last_name: "Doe",
      email: "john@doe.com",
      password: "password",
    });
    await userService.createUser({
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@doe.com",
      password: "password",
    });
    await userService.deleteUser(2);
    const users = await userService.getAllUsers();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("john@doe.com");
  });
});
