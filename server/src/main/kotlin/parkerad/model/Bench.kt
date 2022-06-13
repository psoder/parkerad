package parkerad.model

import org.springframework.stereotype.*

data class Bench(
    val id: Int,    
    val location: String,
    val longitude: Double,
    val latitude: Double,
    val description: String? = null,
    val image: String? = null
)

data class Review(
    val id: Int,
    val rating: Double,
    val text: String?,
    val user: User?,
)

data class BenchReview(val bench: Bench, val reviews: List<Review>)
