import { expect, describe, it } from "@jest/globals";
import { store } from "@/store/store";
import { Company, User } from "@/types";

describe("Vuex Testing", () => {
  it("User add / Remove", async () => {
    const user: User = {
      email: "example@gmai.co",
      first_name: "Bob",
      last_name: "Ross",
      is_admin: false,
      is_owner: false,
    };
    await store.dispatch("userLogin", user);
    expect(store.state.user).toEqual(user);

    await store.dispatch("userLogout");
    expect(store.state.user).toBeNull();
  });
  it("User List", async () => {
    const payload: User[] = [
      {
        id: 1,
        email: "example1@gmail.co",
        first_name: "Bob",
        last_name: "Ross",
      },
      {
        id: 2,
        email: "example2@gmail.co",
        first_name: "Igor",
        last_name: "Munjak",
      },
      {
        id: 3,
        email: "example3@gmail.co",
        first_name: "Nasya",
        last_name: "Ulima",
      },
    ];
    const updatedUser: User = {
      ...payload[1],
      first_name: "Kiril",
      last_name: "Opral",
    };
    await store.dispatch("addUserToList", payload[0]);
    expect(store.state.usersList).toEqual([payload[0]]);
    await store.dispatch("removeUserFromList", 1);
    expect(store.state.usersList).toEqual([]);
    await store.dispatch("changeUserList", payload);
    expect(store.state.usersList).toEqual(payload);
    await store.dispatch("updateUserFromList", updatedUser);
    expect(store.state.usersList[1]).toEqual(updatedUser);
  });

  it("Manages the company list", async () => {
    const payload: Company[] = [
      {
        id: 1,
        name: "Company 1",
        description: "Description 1",
        is_visible: true,
        owner: null,
        members: [],
      },
      {
        id: 2,
        name: "Company 2",
        description: "Description 2",
        is_visible: true,
        owner: null,
        members: [],
      },
      {
        id: 3,
        name: "Company 3",
        description: "Description 3",
        is_visible: true,
        owner: null,
        members: [],
      },
    ];

    const updatedCompany: Company = {
      ...payload[1],
      name: "Updated Company 2",
    };

    // Add a company to the list
    await store.dispatch("addCompanyToList", payload[0]);
    expect(store.state.companyList).toEqual([payload[0]]);

    // Remove a company from the list
    await store.dispatch("removeCompanyFromList", 1);
    expect(store.state.companyList).toEqual([]);

    // Change the entire company list
    await store.dispatch("changeCompanyList", payload);
    expect(store.state.companyList).toEqual(payload);

    // Update a company in the list
    await store.dispatch("updateCompanyFromList", updatedCompany);
    expect(store.state.companyList[1]).toEqual(updatedCompany);
  });
});
