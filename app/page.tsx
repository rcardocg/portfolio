import Container from "@/components/ui/Container";
import PortfolioCard from "@/components/portfolio/PortfolioCard";
import ShapeGrid from "@/components/ui/ShapeGrid";
import { profile } from "@/data/profile";


export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col justify-center py-12 sm:py-16">
      <div aria-hidden="true" className="fixed inset-0 -z-10">
        <ShapeGrid
          speed={0.3}
          squareSize={48}
          direction="right"
          borderColor="rgba(26, 26, 26, 0.1)"
          hoverFillColor="rgba(26, 26, 26, 0.08)"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>
      <Container>
        <PortfolioCard profile={profile} />
      </Container>
    </main>
  );
}
