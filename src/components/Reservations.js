import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getReservations } from '../redux/reservations/reservationsSlice';

const Reservations = () => {
  const { reservations, isLoading, error } = useSelector((store) => store.reservations);
  const user = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

 
};

export default Reservations;
