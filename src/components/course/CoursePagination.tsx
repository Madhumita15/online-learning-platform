import { Button, Typography, Box } from "@mui/material";
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { handleNext, handlePrev } from "../../stores/slices/course.slice";


const CoursePagination = () => {
    const {  page,  totals } = useAppSeletor(
        (state) => state.course,
      );
      const dispatch = useAppDispatch();
  return (
    <>
    <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: 'center',
              marginTop: "30px",
            }}
          >
            <Button
            disabled={page === 1}
              onClick={() => dispatch(handlePrev())}
              color="success"
            >
              <ChevronLeft size={40}/>
            </Button>
            <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", color: '#312E81' }}>{`${page} of ${Math.ceil(totals/5)} data - ${totals}`}</Typography>
            <Button
            disabled={page === Math.ceil(totals / 5)}
              onClick={() => dispatch(handleNext())}
              color="error"
            >
              <ChevronRight size={40}/>
            </Button>
          </Box>
    </>
  )
}

export default CoursePagination