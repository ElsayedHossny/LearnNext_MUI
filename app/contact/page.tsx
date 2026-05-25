"use client"
import React, { useState } from 'react'
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'

const contactInfo = [
  {
    icon: <EmailOutlinedIcon fontSize="large" color="primary" />,
    label: 'Email',
    value: 'support@next-app.com',
  },
  {
    icon: <PhoneOutlinedIcon fontSize="large" color="primary" />,
    label: 'Phone',
    value: '+1 (555) 000-1234',
  },
  {
    icon: <LocationOnOutlinedIcon fontSize="large" color="primary" />,
    label: 'Address',
    value: '123 Main Street, Cairo, EG',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, severity: 'success' })

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email'
    }
    if (!form.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    // TODO: wire up your API call here
    setSnackbar({ open: true, severity: 'success' })
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <Box sx={{ backgroundColor: 'primary.50', py: 6, minHeight: '100vh' }}>
      <Container maxWidth="lg">

        {/* Page Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 5 }}
        >
          Have a question or feedback? We'd love to hear from you.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>

          {/* Contact Info Cards — same grid pattern as Brands */}
          {contactInfo.map((item) => (
            <Grid item xs={12} md={4} key={item.label}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  height: '100%',
                  backgroundColor: 'primary.100',
                  boxShadow: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Box sx={{ mb: 1 }}>{item.icon}</Box>
                <CardContent sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Contact Form */}
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8}>
            <Card
              sx={{
                p: { xs: 3, md: 5 },
                backgroundColor: 'primary.100',
                boxShadow: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Send a Message
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ alignSelf: 'flex-start', px: 5, textTransform: 'none' }}
                >
                  Send Message
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbar((s) => ({ ...s, open: false }))}>
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}