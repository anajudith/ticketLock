import { IShow } from "./Shows.structure";
import supabaseApi from "../api";

class Shows {
  /**
   * @description Signing in
   * @returns {Promise<IShow[] | false>}
   */

  async getShow(): Promise<IShow[] | false> {
    try {
      const { data } = await supabaseApi.from("shows").select();

      if (data) {
        // console.log(data);
        console.log(data, "ola service");

        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
  async getShowById(id: string): Promise<IShow | false> {
    try {
      const { data } = await supabaseApi
        .from("shows")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        return data;
      }

      return false;
    } catch (error) {
      console.error(`Erro ao buscar o show com o ID ${id}:`, error);
      return false;
    }
  }
  async postShow(
    title: string,
    time: string,
    paymentType: string,
    ageRating: string,
    description: string,
    image: string,
    address: string,
    city: string,
    date: Date
  ): Promise<IShow[] | false> {
    try {
      const { data } = await supabaseApi.from("shows").insert({
        title,
        time,
        paymentType,
        ageRating,
        description,
        image,
        address,
        city,
        date,
      });

      if (data) {
        console.log(data);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async deleteShow(id: string): Promise<IShow[] | false> {
    try {
      const { data } = await supabaseApi.from("shows").delete().eq("id", id);

      if (data) {
        console.log(data);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async pesquisa(date: Date | null) {
    try {
      // Fazer a busca levando em conta que com data e horario
      // fazer uma regra que se nn tiver data, não tem busca.

      const { data } = await supabaseApi
        .from("shows")
        .select("*")
        .eq("date", date);

      if (data) {
        console.log(data);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async updateShow(
    id: string,
    date: Date,
    time: string,
    paymentType: string
  ): Promise<IShow[] | false> {
    try {
      const { data } = await supabaseApi
        .from("shows")
        .update({ date, time, paymentType })
        .eq("id", id);

      if (data) {
        console.log(data);
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default new Shows();
