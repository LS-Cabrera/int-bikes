import { describe, expect, test, beforeEach } from "vitest";
import { Rental } from "../Rental.ts";
import { RentalList } from "../RentalList.ts";

describe("RentalList", () => {
  let list: RentalList;
  let rental: Rental;

  beforeEach(() => {
    list = new RentalList();
    rental = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-123",
      bikeType: "urban",
      hours: 3,
      pricePerHour: 100,
      lateHours: 2,
    });
  });

  test("Create an empty rental list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a rental", () => {
    list.add(rental);
    expect(list.getItems()).toEqual([rental]);
  });

  test("reject a bike that is already rented", () => {
    list.add(rental);
    expect(() => list.add(rental)).toThrow();
  });

  test("filter rentals by type", () => {
    list.add(rental);
    expect(list.getByType("urban")).toEqual([rental]);
    expect(list.getByType("electric")).toEqual([]);
  });

  test("total income", () => {
    list.add(rental);
    expect(list.totalIncome()).toBe(300);
  });

  test("total late fees", () => {
    list.add(rental);
    expect(list.totalLateFees()).toBe(400);
  });

  test("total late fees equals 0 if theres no late hours", () => {
    rental.lateHours = 0;

    list.add(rental);
    expect(list.totalLateFees()).toBe(0);
  });

  test("removes the rental from the list", () => {
    const rental2 = new Rental({
      customer: "Juan Gómez",
      bikeCode: "B-435",
      bikeType: "urban",
      hours: 1,
      pricePerHour: 150,
      lateHours: 0,
    });

    list.add(rental);
    list.add(rental2);

    expect(list.size()).toBe(2);

    list.remove("B-123");

    expect(list.size()).toBe(1);
  });

  test("cannot remove a bike that don't exists", () => {
    list.add(rental);
    expect(list.size()).toBe(1);

    expect(() => list.remove("A-999")).toThrow("La bicicleta no existe.");
  });

  test("returns the size of the list", () => {
    expect(list.size()).toBe(0);

    list.add(rental);

    expect(list.size()).toBe(1);
  });
});
