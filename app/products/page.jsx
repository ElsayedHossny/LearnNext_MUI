import React from 'react'
import {
    Box,
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
} from '@mui/material'

async function fetchBrands() {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands')
        const brandData = await response.json()
        return brandData
    } catch (error) {
        console.error(error)
        return { data: [] }
    }
}

export default async function Brands() {
    const { data } = await fetchBrands()

    return (
        <Box sx={{ backgroundColor: 'primary.50', py: 6 }}>
            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    textAlign="center"
                    gutterBottom
                >
                    Brands
                </Typography>

                <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
                    {data.map((brand) => (
                        <Grid item xs={12} sm={6} md={3} key={brand._id}>
                            <Card
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    p: 2,
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
                                <CardMedia
                                    component="img"
                                    image={brand.image}
                                    alt={brand.name}
                                    sx={{
                                        width: '100%',
                                        height: 140,
                                        objectFit: 'contain',
                                    }}
                                />
                                <CardContent sx={{ p: 1, pt: 2, textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {brand.slug}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}