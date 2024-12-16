import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './../environments/environment';

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
      // Step 1: Insert a new concert
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
}
