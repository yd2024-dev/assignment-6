// services/warehouse-api/src/controllers/WarehouseController.ts

import { Controller, Get, Post, Put, Delete, Route, Tags, Body, Path } from 'tsoa';

interface Item {
  id: number;
  name: string;
  quantity: number;
  location: string;
}

@Route("warehouse")
@Tags("Warehouse")
export class WarehouseController extends Controller {

  private items: Item[] = [
    { id: 1, name: "Item 1", quantity: 100, location: "A1" },
    { id: 2, name: "Item 2", quantity: 200, location: "B2" },
  ];

  @Get("{id}")
  public async getItem(@Path() id: number): Promise<Item | null> {
    const item = this.items.find(item => item.id === id);
    return item ? item : null;
  }

  @Post()
  public async addItem(@Body() item: Item): Promise<Item> {
    this.items.push(item);
    return item;
  }

  @Put("{id}")
  public async updateItem(@Path() id: number, @Body() updatedItem: Item): Promise<Item | null> {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) return null;

    this.items[itemIndex] = updatedItem;
    return updatedItem;
  }

  @Delete("{id}")
  public async deleteItem(@Path() id: number): Promise<boolean> {
    const itemIndex = this.items.findIndex(item => item.id === id);
    if (itemIndex === -1) return false;

    this.items.splice(itemIndex, 1);
    return true;
  }
}