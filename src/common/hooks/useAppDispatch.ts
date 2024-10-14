import { Dispatch } from "@reduxjs/toolkit";
import { AppDispatch } from "app/store";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<AppDispatch>();
