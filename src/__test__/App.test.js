import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import book from "../data/fantasy.json";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

//ESERCIZIO 1

describe("General mounting", () => {
  // voglio controllare ce Welcome è nella pagina
  it("correctly mount Welcome", () => {
    // PUNTO 1: monto App nel VIRTUAL DOM
    render(<App />);
    //PUNTO 2: cerco tramite il testo se ce welcome
    const welcome = screen.getByText(/benvenuti/i);
    //PUNTO 3: il punto 3 al momento non ce perche non è interattivo
    //PUNTO 4: Welcome dovrebbe essere nel VIRTUAL DOM ( si spera...)
    expect(welcome).toBeInTheDocument();
  });

  //ESERCIZIO 3

  it("correctly mount CommentArea", () => {
    render(<App />);
    const label = screen.getByText(/recensione/i);
    expect(label).toBeInTheDocument();
  });
});

//ESERCIZIO 2

describe("all books json", () => {
  it("serch all books", () => {
    render(<App />);
    const img = screen.queryAllByRole("img");
    expect(img).toHaveLength(book.length);
  });
});

//ESERCIZIO 5

describe("border red", () => {
  it("cliking on the book a red border appears", () => {
    render(<App />);
    // controllo tutte le img
    const img = screen.getAllByRole("img");
    // simulo il clic solo sulla prima img
    fireEvent.click(img[0]);
    // controllo se ha lo stile border sull'elemento figlio
    expect(img[0].parentElement).toHaveStyle("border: 3px solid red");
  });

  //ESERCIZIO 6

  it("clicking on the second book resets the border of the first book", () => {
    render(<App />);

    const img = screen.getAllByRole("img");

    // simulo il clic sul primo libro
    fireEvent.click(img[0]);

    // simulo il clic sul secondo libro
    fireEvent.click(img[1]);

    expect(img[0].parentElement).toHaveStyle("border: none");
  });
});
