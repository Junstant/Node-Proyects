import React from "react";
import { Box, Card, CardContent, Typography, Stack } from "@mui/material";
import { CalendarDot } from "@phosphor-icons/react";
import dayjs from "dayjs";
import useUserStore from "../../../../stores/userStore";

const ModuleTimeBlock = () => {
  const { activeModule, activeYear } = useUserStore();

  // Función para obtener los próximos 10 días
  const getNextTenDays = () => {
    const days = [];
    for (let i = 0; i < 10; i++) {
      const date = dayjs().add(i, "day");
      const dayOfWeek = date.format("dddd"); // Nombre del día
      const formattedDate = date.format("DD MMM"); // Fecha formateada
      days.push({ date, dayOfWeek, formattedDate });
    }
    return days;
  };

  const nextTenDays = getNextTenDays();

  return (
    <Box display="flex" overflow="auto" gap={2} padding={2}>
      {nextTenDays.map((day, index) => {
        // Buscar si hay cursada para este día
        const matchingSchedule = activeModule.schedule.find((sched) => sched.days.some((d) => d.name === day.dayOfWeek));

        return (
          <Card
            key={index}
            sx={{
              minWidth: 120,
              maxWidth: 150,
              height: 120,
              border: 1,
              borderColor: activeModule.color,
              borderRadius: 4,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              padding: 1,
            }}
          >
            {/* Año en la esquina superior izquierda */}
            <CardContent sx={{ padding: 0, width: "100%" }}>
              <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center" gap={0.5}>
                  <CalendarDot fontSize="small" />
                  <Typography fontSize={10}>{activeYear?.name}</Typography>
                </Stack>
              </Stack>
            </CardContent>

            {/* Fecha y día */}
            <Typography variant="h6">{day.formattedDate}</Typography>
            <Typography variant="body2" color="textSecondary">
              {day.dayOfWeek}
            </Typography>

            {/* Horarios (si aplica) */}
            {matchingSchedule ? (
              <Box textAlign="center">
                {matchingSchedule.days.map((sched, i) => (
                  <Typography key={i} fontSize={12}>
                    {sched.fromHr} - {sched.toHr}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography fontSize={12} color="textSecondary">
                No class
              </Typography>
            )}
          </Card>
        );
      })}
    </Box>
  );
};

export default ModuleTimeBlock;
