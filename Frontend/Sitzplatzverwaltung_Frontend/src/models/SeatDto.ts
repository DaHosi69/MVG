export interface SeatDto
{
    id: number;
    concert_id: number;
    row_number: number;
    seat_number: number;
    is_occupied: boolean;
}