const sellers = [
    {
        name: "Abdul Phones",
        trustId: "TA-FUTA-001",
        score: 91,
        sales: 37,
        reviews: "★★★★☆",
        reports: 1,
        status: "Verified"
    },

    {
        name: "FUTA Gadgets",
        trustId: "TA-FUTA-002",
        score: 85,
        sales: 22,
        reviews: "★★★★☆",
        reports: 0,
        status: "Verified"
    },

    {
        name: "Campus Phones",
        trustId: "TA-FUTA-003",
        score: 74,
        sales: 12,
        reviews: "★★★☆☆",
        reports: 2,
        status: "Under Review"
    },

    {
        name: "Quick Phone Deals",
        trustId: "TA-FUTA-004",
        score: 32,
        sales: 8,
        reviews: "★★☆☆☆",
        reports: 7,
        status: "High Risk"
    },

    {
        name: "Smart Deals Hub",
        trustId: "TA-FUTA-005",
        score: 18,
        sales: 3,
        reviews: "★☆☆☆☆",
        reports: 11,
        status: "Not Recommended"
    }
];


function searchSeller() {

    const input = document.getElementById("sellerInput");
    const result = document.getElementById("searchResult");

    const searchTerm = input.value.trim().toLowerCase();


    if (searchTerm === "") {

        result.hidden = false;

        result.innerHTML = `
            <div class="result-card warning">
                <strong>Enter a seller name or Trust ID.</strong>
            </div>
        `;

        return;
    }


    const seller = sellers.find(item =>

        item.name.toLowerCase().includes(searchTerm) ||
        item.trustId.toLowerCase().includes(searchTerm)

    );


    result.hidden = false;


    if (!seller) {

        result.innerHTML = `
            <div class="result-card warning">

                <div class="result-header">

                    <h3>Seller not found</h3>

                    <span class="status-pill review">
                        No Profile
                    </span>

                </div>

                <p>
                    We could not find a demo seller matching
                    "<strong>${escapeHTML(input.value)}</strong>".
                </p>

                <p class="result-note">
                    Try: Abdul Phones, FUTA Gadgets, Campus Phones,
                    Quick Phone Deals, Smart Deals Hub,
                    or TA-FUTA-001.
                </p>

            </div>
        `;

        return;
    }


    let statusClass = "review";

    if (seller.status === "Verified") {
        statusClass = "verified";
    }

    if (
        seller.status === "High Risk" ||
        seller.status === "Not Recommended"
    ) {
        statusClass = "danger";
    }


    let riskWarning = "";

    if (
        seller.status === "High Risk" ||
        seller.status === "Not Recommended"
    ) {

        riskWarning = `
            <div class="risk-warning">

                <strong>⚠ Buyer Warning</strong>

                <p>
                    This seller has a low trust score and multiple reports.
                    Proceed with caution and do not make payment without
                    further verification.
                </p>

            </div>
        `;
    }


    result.innerHTML = `
        <div class="result-card">

            <div class="result-header">

                <h3>
                    ${seller.name}
                </h3>

                <span class="status-pill ${statusClass}">
                    ${seller.status}
                </span>

            </div>


            <div class="trust-score-row">

                <span>Trust Score</span>

                <strong>
                    ${seller.score}/100
                </strong>

            </div>


            <div class="score-meter">

                <span
                    class="score-fill"
                    style="width:${seller.score}%">
                </span>

            </div>


            <div class="result-grid">

                <div class="result-metric">

                    <span>Trust ID</span>

                    <strong>
                        ${seller.trustId}
                    </strong>

                </div>


                <div class="result-metric">

                    <span>Verified Sales</span>

                    <strong>
                        ${seller.sales}
                    </strong>

                </div>


                <div class="result-metric">

                    <span>Reviews</span>

                    <strong>
                        ${seller.reviews}
                    </strong>

                </div>


                <div class="result-metric">

                    <span>Reports</span>

                    <strong>
                        ${seller.reports}
                    </strong>

                </div>

            </div>


            ${riskWarning}


            <p class="result-note">
                Demo profile for the Trust Anchor prototype.
                A trust score should support a buyer's decision,
                not replace proper inspection and verification.
            </p>

        </div>
    `;
}


function focusSearch() {

    const input = document.getElementById("sellerInput");

    document
        .getElementById("home")
        .scrollIntoView({
            behavior: "smooth"
        });


    setTimeout(() => {

        input.focus();

    }, 450);

}


function goToHowItWorks() {

    document
        .getElementById("how-it-works")
        .scrollIntoView({
            behavior: "smooth"
        });

}


function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


/* Search when Enter is pressed */

document.addEventListener("DOMContentLoaded", function () {

    const sellerInput = document.getElementById("sellerInput");

    if (sellerInput) {

        sellerInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                searchSeller();

            }

        });

    }

});/* Search when Enter is pressed
   and close result when search box is cleared */

document.addEventListener("DOMContentLoaded", function () {

    const sellerInput = document.getElementById("sellerInput");
    const searchResult = document.getElementById("searchResult");

    if (sellerInput) {

        /* Search when Enter is pressed */
        sellerInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                searchSeller();
            }

        });


        /* Hide result when input is cleared */
        sellerInput.addEventListener("input", function () {

            if (sellerInput.value.trim() === "") {

                searchResult.hidden = true;
                searchResult.innerHTML = "";

            }

        });

    }

});