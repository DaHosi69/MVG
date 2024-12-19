import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './../environments/environment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);

  async getSeats(concertId: number) {
    const { data, error } = await this.supabase
      .from('seats')
      .select('*')
      .eq('concert_id', concertId);
    if (error) throw error;
    return data;
  }

  async getConcerts() {
    const { data, error } = await this.supabase.from('concerts').select('*');
    if (error) throw error;
    return data;
  }

  async deleteSeat(seatId: number) {
    const { data, error } = await this.supabase
      .from('seats')
      .delete()
      .eq('id', seatId);
    if (error) throw error;
    return data;
  }

  async addConcertWithSeats(name: string, date: string, rows: number, seatsPerRow: number) {
    try {
      const { data: concert, error: concertError } = await this.supabase
        .from('concerts')
        .insert([{ name, date, total_seats: rows * seatsPerRow }])
        .select()
        .single();

      if (concertError) throw concertError;

      const seats = [];
      for (let row = 1; row <= rows; row++) {
        for (let seat = 1; seat <= seatsPerRow; seat++) {
          seats.push({
            concert_id: concert.id,
            row_number: row,
            seat_number: seat,
            is_occupied: false,
          });
        }
      }

      const { error: seatError } = await this.supabase.from('seats').insert(seats);
      if (seatError) throw seatError;

      return {
        concert,
        totalSeats: seats.length,
      };
    } catch (error) {
      console.error('Error adding concert with seats:', error);
      throw error;
    }
  }

  getOccupiedSeatsCount = async (concertId: number): Promise<number> => {
    const { count, error } = await this.supabase
      .from('seats')
      .select('*', { count: 'exact', head: true })
      .eq('concert_id', concertId)
      .eq('is_occupied', true);
  
    if (error) {
      console.error('Error fetching occupied seats count:', error);
      return -1; 
    }
    return count ?? 0;
  };
  
}
