import { ReactElement, FormEvent, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import SendIcon from '@mui/icons-material/Send'

type PropTypes = {
  handleChange: (e: ChangeEvent) => void
  handleSubmit: (e: FormEvent) => void
}

const SendAndRequestForm = ({
  handleChange,
  handleSubmit,
}: PropTypes): ReactElement => {
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ width: '360px', mb: '12px' }}
        id="outlined-basic"
        label="Email or Phone number"
        variant="outlined"
        name="emailOrPhone"
        onChange={handleChange}
      />
      <br />
      <TextField
        sx={{ width: '360px', mb: '12px' }}
        id="outlined-basic"
        label="Amount"
        type="number"
        variant="outlined"
        name="amount"
        onChange={handleChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
      />
      <br />
      <TextField
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        sx={{ width: '360px', mb: '12px' }}
        multiline
        rows={8}
        name="message"
        label="Message"
        onChange={handleChange}
      />
      <br />
      <Button type="submit" variant="contained" startIcon={<SendIcon />}>
        Send
      </Button>
    </form>
  )
}

export default SendAndRequestForm
