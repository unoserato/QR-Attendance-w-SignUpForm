import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import eventList from "../../../../helpers/eventList";
import attendanceList from "../../../../helpers/attendance";
import activityList from "../../../../helpers/activityList";

export default function AttendanceByEventChart() {
  const eventAttendance = eventList.map((event) => {
    const activityIDs = activityList
      .filter((act) => act.eventID === event.id)
      .map((act) => act.id);

    const count = attendanceList.filter((att) =>
      activityIDs.includes(att.actID)
    ).length;

    return {
      eventID: event.id,
      name: event.name,
      count,
    };
  });

  const topEvent = eventAttendance.reduce((max, curr) =>
    curr.count > max.count ? curr : max
  );

  return (
    <Box width="100%" className="bg-white p-4 rounded-xl shadow w-full">
      <Typography variant="h6" className="mb-4">
        Attendance by Event
      </Typography>

      <BarChart
        height={350}
        width={600}
        layout="horizontal"
        yAxis={[
          {
            data: eventAttendance.map((e) => e.name),
            scaleType: "band",
          },
        ]}
        xAxis={[
          {
            scaleType: "linear",
            min: 0,
            max: Math.max(...eventAttendance.map((e) => e.count)) + 2,
          },
        ]}
        series={[
          {
            id: "attendance",
            data: eventAttendance.map((e) => e.count),
            label: "Attendees",
            color: "#3b82f6",
          },
        ]}

      />
      <h2>
        <b className="text-blue-900">{topEvent.name}</b> is the event with the
        most participant
      </h2>
    </Box>
  );
}
