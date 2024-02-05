import Card from "../../components/Card/Card";

function NoOrders() {
    const intlDate = new Intl.DateTimeFormat("pl-PL", {
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date())
    return (
        <>
            <h3>Brak aktywnych diet 😥</h3>
            <h4>Dzisiaj {intlDate}</h4>
            <section>
                <Card>
                    <p>Czas na kolejny krok</p>
                    <button>Wybierz dietę</button>
                </Card>
            </section>
        </>
    )
}

export default NoOrders;