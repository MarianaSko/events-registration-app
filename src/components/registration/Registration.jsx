import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { AppContext } from "../../App.jsx";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { api } from "../../configAPI/api.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StyledButton from "../StyledButton.jsx";
import { schema } from "./registrationSchema.js";

const Registration = () => {
  const [birthDate, setBirthDate] = useState(dayjs());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const {
    setHeaderTitle,
    activeEvent,
    setError,
    setIsLoading,
    events,
    setActiveParticipants,
  } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!activeEvent) {
      navigate("/");
    } else {
      setHeaderTitle(`${activeEvent.title} event registration`);
    }
  }, [activeEvent, navigate, setHeaderTitle]);

  const submit = (e) => {
    const newParticipant = {
      name: e.name,
      email: e.email,
      birthDate: birthDate.$d,

      source: e.source,
    };

    const addParticipants = async () => {
      setIsLoading(true);
      try {
        const response = await api.post(
          `/events/${activeEvent.id}/participants`,
          newParticipant
        );

        if (response.status === 200 && response.data) {
          toast("You have successfully registered for the event!");

          const participants =
            events.find((event) => event._id === activeEvent.id)
              ?.participants || [];

          setActiveParticipants([...participants, { ...newParticipant }]);
          localStorage.setItem(
            "activeParticipants",
            JSON.stringify([...participants, { ...newParticipant }])
          );

          navigate("/participants");
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        setError("Failed to add participant. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    addParticipants();
  };
  return (
    <div className="w-max p-5 border rounded-md shadow-md mx-auto">
      <form
        action=""
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-6 "
      >
        <div className="relative">
          <TextField
            label="Full name"
            {...register("name")}
            id="outlined-start-adornment"
            required
            className="w-full"
          />
          {errors?.name && (
            <p className="text-red-500 text-xs absolute">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <TextField
            {...register("email")}
            label="Email"
            type="email"
            required
            className="w-full"
          />
          {errors?.email && (
            <p className="text-red-500 text-xs absolute">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...register("birthDate")}
              label="Birth Date"
              onChange={(date) => {
                setBirthDate(date);
                setValue("birthDate", date, { shouldValidate: true });
              }}
              maxDate={dayjs()}
              className="w-full"
            />
          </LocalizationProvider>
          {errors?.birthDate && (
            <p className="text-red-500 text-xs absolute">
              {errors?.birthDate?.message}
            </p>
          )}
        </div>
        <div className="relative">
          <p className="text-center opacity-70">
            Where did you hear about this event?
          </p>
          <RadioGroup
            row
            aria-labelledby="radio-buttons"
            defaultValue="socialMedia"
          >
            <FormControlLabel
              {...register("source")}
              value="socialMedia"
              control={<Radio />}
              label="Social Media"
            />
            <FormControlLabel
              {...register("source")}
              value="friends"
              control={<Radio />}
              label="Friends"
            />
            <FormControlLabel
              {...register("source")}
              value="myself"
              control={<Radio />}
              label="Found myself"
            />
          </RadioGroup>
          {errors?.source && (
            <p className="text-red-500 text-xs absolute">
              {errors?.source?.message}
            </p>
          )}
        </div>
        <StyledButton isRegistration={true}>Add</StyledButton>
      </form>
    </div>
  );
};

export default Registration;
