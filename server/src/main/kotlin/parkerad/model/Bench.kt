package parkerad.model

import org.springframework.stereotype.*

data class Bench(
    val location: String,
    val longitude: Double,
    val latitude: Double,
    val description: String?,
    val image: String?
)

data class Review(
    val rating: Double,
    val bench: Bench,
    val text: String?,
    val user: User?,
)
