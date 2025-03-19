import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from './../environments/environment';
import {Observable} from "rxjs";
import { SeatDto } from '../models/SeatDto';
import { Seat } from '../models/Seat';
import { UserDto } from '../models/UserDto';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  currentUser: UserDto | null = null;

   async loadCurrentUser(): Promise<void> {
    const { data, error } = await this.supabase.auth.getUser();
    if (!error && data.user) {
      this.currentUser = data.user as UserDto;
    } else {
      this.currentUser = null;
    }
  }

  async login(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    this.loadCurrentUser();
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
  
  async getCurrentUser() {
    const { data, error } = await this.supabase.auth.getUser();
    console.log(data.user);
    
    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  }
  
  async isAuthenticated(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user; 
  }

  async updateSeats(updatedSeats: SeatDto[]): Promise<void> {
    const { data, error } = await this.supabase
      .from('seats') 
      .upsert(updatedSeats, { onConflict: 'id' }); 

    if (error) {
      console.error('Error updating seats:', error);
      throw error;
    }
  }

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
  
  async createConcertWithSeats(
    name: string,
    date: string,
    totalSeats: number,
    seatRows: number
  ): Promise<void> {
    try {
      const { data: concert, error: concertError } = await this.supabase
        .from('concerts')
        .insert([
          {
            name: name,
            date: date,
            total_seats: 201,
            seat_rows: 13,
          },
        ])
        .select(); 
  
      if (concertError || !concert || concert.length === 0) {
        console.error('Error creating concert:', concertError?.message);
        throw new Error(concertError?.message || 'Unable to create concert.');
      }
  
      const concertId = concert[0].id; 
      const seatDistribution = [8, 17, 9, 18, 16, 17, 16, 17, 18, 19, 18, 16, 12];
  
      const seats: Seat[] = [];
  
      seatDistribution.forEach((seatsInRow, rowIndex) => {
        const rowNumber = rowIndex + 1;
        for (let seatNumber = 1; seatNumber <= seatsInRow; seatNumber++) {
          seats.push({
            concert_id: concertId,
            row_number: rowNumber,
            seat_number: seatNumber,
            is_occupied: false,
          });
        }
      });
      const { error: seatError } = await this.supabase.from('seats').insert(seats);
  
      if (seatError) {
        console.error('Error creating seats:', seatError.message);
        throw new Error(seatError.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
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

  async deleteConcert(concertId: number): Promise<void> {
    try {
      const { error: seatError } = await this.supabase
        .from('seats')
        .delete()
        .eq('concert_id', concertId);
  
      if (seatError) {
        console.error('Error deleting seats:', seatError.message);
        throw new Error(seatError.message);
      }
  
      const { error: concertError } = await this.supabase
        .from('concerts')
        .delete()
        .eq('id', concertId);
  
      if (concertError) {
        console.error('Error deleting concert:', concertError.message);
        throw new Error(concertError.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
  
  
}
