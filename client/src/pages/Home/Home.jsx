import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <section className="presentation">
      <h2>Partagez, Troquez, Progressez : Bienvenue sur Skill Swap !</h2>
      <p>
        Bonjour et bienvenue sur Skill Swap, le site où vos talents trouvent
        leur match parfait ! Ici, on ne parle pas d’argent, mais d’échanges de
        compétences entre particuliers. Vous êtes un as du bricolage mais un
        vrai novice en cuisine ? Pas de panique, troquez vos savoir-faire avec
        un voisin cordon bleu en quête d’un coup de marteau. Sur Skill Swap, on
        troque, on partage, et surtout, on s’entraide avec le sourire. Parce
        qu’après tout, pourquoi payer quand on peut échanger un peu de temps et
        beaucoup de talent ? Allez, faites le premier pas, vos compétences
        n'attendent plus que vous !
      </p>
      <Link to="/utilisateurs" className="button">
        On commence ?
      </Link>
    </section>
  );
}

export default Home;
