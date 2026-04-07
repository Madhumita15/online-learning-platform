import { Button, Box, Typography } from "@mui/material"
import { handleNext, handlePrev } from "../../stores/slices/blog.slice"
import { useAppDispatch, useAppSeletor } from "../../services/helper/redux"
import { ChevronLeft, ChevronRight } from "lucide-react"


const BlogPagination = () => {
    const dispatch = useAppDispatch()
    const {page, totals} = useAppSeletor((state)=> state.blog)
  return (
    <>
     <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            gap: 10,
          }}
        >
          <Button
            disabled={page == 1}
            onClick={() => dispatch(handlePrev())}
            color="success"
          >
            <ChevronLeft size={40} />
          </Button>
          <Typography variant="body1" sx={{ fontWeight: "bold", fontSize: "20px", color: '#312E81' }}>{`${page} of ${Math.ceil(totals / 5)} data - ${totals}`}</Typography>
          <Button
            disabled={page === Math.ceil(totals / 5)}
            onClick={() => dispatch(handleNext())}
            color="error"
          >
            <ChevronRight size={40} />
          </Button>
        </Box>
    </>
  )
}

export default BlogPagination