import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { useState, useMemo } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, { DataPoint } from "regression";

function Predictions() {
    const { palette } = useTheme()
    const [isPredictionsVisible, setIsPredictionsVisible] = useState(false);
    const { data: operationalData } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!operationalData) {
            return [];
        }
        const monthData = operationalData[0].monthly_data;
        const formatted: Array<DataPoint> = monthData.map(({ revenue }, i: number) => {
            return [i, +revenue.split('$')[1]];
        });
        const regressionLine = regression.linear(formatted);
        return monthData.map(({ month, revenue},  i: number) => {
            return {
                name: month,
                "Actual Revenue": +revenue.split('$')[1],
                "Regression Line": regressionLine.points[i][1],
                "Predicted Revenue": regressionLine.predict(i + 12)[1]
            }
        })
    }, [operationalData]);

    return (
        <DashboardBox width="100%" height="100%" overflow="hidden" p="1rem">
            <FlexBetween m="1rem 2.5rem" gap="0.3rem">
                <Box>
                    <Typography variant="h3">
                        Revenue and Predictions
                    </Typography>
                    <Typography variant="h6">
                        charted revenue and predicted revenue based on a simple regression model
                    </Typography>
                </Box>
                <Button onClick={() => setIsPredictionsVisible(!isPredictionsVisible)} sx={{color: palette.grey[900], bgcolor: palette.grey[700], boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)"}}>
                    {!isPredictionsVisible? "Hide" : "Show"} Predicted Revenue for Next Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                data={formattedData}
                margin={{
                    top: 20,
                    right: 75,
                    left: 20,
                    bottom: 80,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
                <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px'}}>
                    <Label value="Month" offset={-5} position="insideBottom" />
                </XAxis>
                <YAxis tickFormatter={(v) => `$${v}`} domain={[12000, 26000]} axisLine={{ strokeWidth: '0'}} tickLine={false} style={{ fontSize: '10px'}}>
                    <Label angle={-90} value="Revenue in EUR" offset={-5} position="insideLeft" />
                </YAxis>
                <Tooltip />
                <Legend verticalAlign="top" />
                <Line type="monotone" dataKey="Actual Revenue" stroke={palette.primary.main} strokeWidth={0} dot={{ strokeWidth: 5}} />
                <Line type="monotone" dataKey="Regression Line" stroke="#8884d8" dot={false} />
                {isPredictionsVisible && (
                    <Line strokeDasharray="5 5" type="monotone" dataKey="Predicted Revenue" stroke={palette.secondary[500]} dot={false} />
                )}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
}

export default Predictions;