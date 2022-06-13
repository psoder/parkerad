package parkerad.integration

import parkerad.model.*

class BenchDB {

    private val users = mapOf(0 to User("Adam Degen"), 1 to User("Snöderlund"))

    private val benches =
            mapOf(
                    0 to Bench("Fippelistan0", 0.0, 0.0, "A very nice place0", "no img0"),
                    1 to Bench("Fippelistan1", 1.0, 1.0, "A very nice place1", "no img1"),
                    2 to Bench("Fippelistan2", 2.0, 2.0, "A very nice place2", "no img2")
            )

    private val reviews = mapOf(
                    0 to Review(3.0, benches[0]!!, "Acceptable", users[0]!!),
                    1 to Review(5.0, benches[1]!!, "Excellent", users[1]!!),
                    2 to Review(2.0, benches[0]!!, "Eh", users[1]!!)
            )

    fun getBench(id: Int): Bench? = benches[id]

    fun getBenches(): List<Bench> = benches.values.toList()

    fun getReview(id: Int): Review? = reviews[id]

    fun getReviews(): List<Review> = reviews.values.toList()

    fun reviewsForBench(id: Int): List<Review> {
        return reviews.filter { it.key.equals(id) }.values.toList()
    }
}
