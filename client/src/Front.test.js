// 
import { tempFilter, createdOrApiFilter, orderByName, orderByWeight } from "./actions/index.js";

describe("Actions", () => {

  it('Debería retornar una action con las propiedades type "DB_OR_API_FILTER" y payload, su valor lo recibe por argumento:', () => {
    expect(createdOrApiFilter("apidogs")).toEqual({
      type: "DB_OR_API_FILTER",
      payload: "apidogs",
    });
  });
  
  it('Debería retornar una action con las propiedades type "TEMP_FILTER" y payload, su valor lo recibe por argumento:', () => {
    expect(tempFilter("Happy")).toEqual({
      type: "TEMP_FILTER",
      payload: "Happy",
    });
  });


  it('Debería retornar una action con la propiedad type "ORDER_BY_NAME" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderByName("asc")).toEqual({
        type: "ORDER_BY_NAME",
        payload: "asc",
    });
  }); 
  it('Debería retornar una action con la propiedad type "ORDER_BY_WEIGHT" y el payload, su valor lo recibe por argumento:', () => {
    expect(orderByWeight("w.asc")).toEqual({
      type: "ORDER_BY_WEIGHT",
      payload:"w.asc",
    })
  })
})