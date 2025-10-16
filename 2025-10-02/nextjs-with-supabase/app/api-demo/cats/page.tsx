
type CatFact = {
    text: string;
    type: string;
    _id: string;
};

async function getCatFact(): Promise<CatFact> {
    const res = await fetch("https://cat-fact.herokuapp.com/facts/random", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error(`Failed to fetch cat fact: ${res.status}`);
    return res.json();
}

export default async function CatFactsPage() {
    const fact = await getCatFact();

    return <div>{fact.text}</div>;
}
