import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { SupabaseService } from '../../services/supabase.service';
import { SeatDto } from '../../models/SeatDto';

export const reservationsResolver: ResolveFn<SeatDto[]> = (route, state) => {
  const concertId = route.paramMap.get('id');
  if (concertId === null) return [];
  return inject(SupabaseService).getSeats(parseInt(concertId));
};
