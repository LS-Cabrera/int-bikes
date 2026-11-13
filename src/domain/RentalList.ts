import type { BikeType, Rental } from "./Rental.ts";

export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(_bikeCode: string): void {
    // TODO: eliminar el alquiler de esa bicicleta
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
    let total = 0;

    for (const r of this.#items) {
      if (r.lateHours > 0) {
        total += r.lateHours * r.pricePerHour * 2;
      }
    }

    return total;
  }
}
