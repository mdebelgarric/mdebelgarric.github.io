---
layout: default
title: Publications
permalink: /publications/
---

# Publications

---

## Journal Articles


- **Debelgarric, M.**,  Geffard, O., Felten, V., Lopes, C. (2026).  
  *Molting else matters: an extended bioenergetic model for Gammarus fossarum that links molt and reproduction*.  
  **Ecological Modelling**, Preprint.  
  [DOI: 10.2139/ssrn.6183045](https://doi.org/10.2139/ssrn.6183045)

---


- **Debelgarric, M.**, Récapet, C. (2025).  
  *Exploring physiological constraints on life-history traits using Dynamic Energy Budgets*.  
  **Ecological Modelling**, 501.  
  [DOI: 10.1016/j.ecolmodel.2024.110993](https://doi.org/10.1016/j.ecolmodel.2024.110993)

---


- Trochet, A., Le Chevalier, H., Calvez, O., Barthe, L., Isselin-Nondedeu, F., Picard, D., **Debelgarric, M.**, Pégourié, N., Rocher, R., Ribéron, A. (2017).  
  *Postbreeding movements in marbled newts (Caudata, Salamandridae): a comparative radiotracking study in two habitat types*.  
  **Herpetologica**, 73(1), 1–9.  
  [DOI: 10.1000/183](https://doi.org/10.1000/183)

---

## Conferences & Oral Presentations

<style>
  .timeline {
    position: relative;
    max-width: 750px;
    margin: 2rem auto;
    padding: 1rem 0;
  }

  /* Ligne centrale de la frise */
  .timeline::after {
    content: '';
    position: absolute;
    width: 3px;
    background-color: rgb(85, 71, 84);
    top: 0;
    bottom: 0;
    left: 40px;
    margin-left: -1.5px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 2.5rem;
    padding-left: 80px;
  }

  /* Badge / Logo sur la frise (Fond blanc + contour noir) */
  .timeline-logo {
    position: absolute;
    left: 20px;
    top: 0;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #ffffff;
    color: #000000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    border: 2px solid rgb(85, 71, 84);
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
    z-index: 2;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .timeline-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .timeline-item:hover .timeline-logo {
    transform: scale(1.15);
  }

  /* Contenu de base (Date et événement) */
  .timeline-date {
    font-weight: bold;
    color: rgb(212, 91, 212);
    font-size: 0.9rem;
  }

  .timeline-event {
    font-size: 1rem;
    font-weight: 600;
    color: #21261F;
  }

  /* Carte d'information au survol (Tooltip) */
  .timeline-card {
    display: none;
    position: absolute;
    left: 80px;
    top: 30px;
    width: 320px;
    background: #FBFAF6;
    border: 1px solid rgb(219, 180, 224);
    border-radius: 6px;
    padding: 12px 16px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
    z-index: 10;
  }

  .timeline-item:hover .timeline-card {
    display: block;
  }

  .timeline-card .tag {
    display: inline-block;
    background: rgb(212, 91, 212);
    color: white;
    font-size: 0.7rem;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 3px;
    margin-bottom: 6px;
  }

  .timeline-card .tag.poster {
    background: #B08947;
  }

  .timeline-card .title {
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 6px;
    line-height: 1.3;
  }

  .timeline-card .location {
    font-size: 0.75rem;
    color: #55594E;
    font-style: italic;
  }

  .timeline-card img.conf-img {
    width: 100%;
    height: 110px;
    object-fit: cover;
    border-radius: 4px;
    margin-top: 8px;
  }

  .timeline-card details {
    margin-top: 8px;
    border-top: 1px dashed #B7B29E;
    padding-top: 6px;
    font-size: 0.75rem;
  }

  .timeline-card summary {
    cursor: pointer;
    font-weight: 600;
    color: rgb(212, 91, 212);
  }

  .timeline-card .abstract-text {
    margin-top: 6px;
    color: #55594E;
    line-height: 1.35;
    text-align: justify;
  }
</style>



<div class="timeline">

  <!-- Jul 2026 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/mmee_logo.png" alt="Logo MMEE"></div>
    <div class="timeline-date">July 2026</div>
    <div class="timeline-event">Mathematical Modelling in Ecology and Evolution</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Energy allocation and fitness: using DEB theory to model metal-induced trade-offs in a sentinel species</div>
      <div class="location">Cork, Ireland</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>Heavy metals are present throughout the environment, particularly in freshwater, due to various anthropogenic causes. This contamination of water significantly contributes to population decline through individual mortality and physiological impairment. Although traditional ecotoxicological models such as the dose-response model quantify toxicity and its effects on organisms, they often fail to capture the underlying physiological mechanisms involved, such as assimilation capacity and the trade-off between maintenance, growth, and reproduction. To bridge this gap, more complex models have been developed that consider bioenergetic processes, leading to a better understanding of physiological processes, as well as the concentration of toxicant assimilated by organisms, in order to explain their effects on an organism's physiology over time.</p>
      <p>This study aims to implement a Dynamic Energy Budget (DEB) model for the tiny freshwater amphipod <i>Gammarus fossarum</i>, a sentinel species, which allows to predict life-history traits (respectively growth, reproduction and lifespan) during time. Due its unique reproductive cycle, we developed a new DEB formalism and a toxico-kinetic toxico-dynamic component was added to identify the physiological mode of action of specific metals.
      To this end, we used a dataset from experiments involving individuals exposed to different concentrations of various metals. First, we employed a Bayesian approach to estimate primary physiological parameters from the control group. We then validated the model's predictive power by comparing these simulations against our datasets of exposed individuals. This mechanistic approach improves our understanding of individual fitness and provides robust predictions about the evolutionary potential of populations facing such environmental stressors.</p>
      <p><em>Keywords: DEB-TKTD, Bayesian inference, heavy metals, ecotoxicology, fitness, Gammarus fossarum</em></p>
    </div>
  </details>
    </div>
  </div>

  <!-- Feb 2026 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/ucbl_logo.png" alt="Logo UCBL"></div>
    <div class="timeline-date">February 2026</div>
    <div class="timeline-event">Décryp'thèse 2026</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Assessing the impact of heavy metals on <i>Gammarus fossarum</i> life-history traits using bioenergetics modelling</div>
      <div class="location">Lyon, France</div>
    </div>
  </div>

  <!-- Jan 2026 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/GDREA_logo.png" alt="Logo GDREA"></div>
    <div class="timeline-date">January 2026</div>
    <div class="timeline-event">GDR Ecotoxicologie Aquatique</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Modelling the molting cycle in the sentinel species <i>Gammarus fossarum</i>: effects of heavy metals on reproduction</div>
      <div class="location">Banyuls-sur-mer, France</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>Research into the impact of chemical contaminants on the life history traits of organisms has traditionally relied on dose-response models. While these models can indicate toxicity, they ignore the temporal dimension of exposure, despite the fact that toxicity is a gradual, dynamic process (Baas et al., 2010). A new approach is now being proposed in the form of toxicokinetic-toxicodynamic (TKTD) models. These mechanistic models formalise the link between exposure to a contaminant and its bioaccumulation over time (the toxicokinetic component, TK), as well as the link between the bioaccumulated concentration and the effects on life history traits over time (the toxicodynamic component, TD). DEBtox-type TKTD models (‘Dynamic Energy Budget theory for ecoTOXicology’) (Kooijman, 1993) are effective tools for predicting life history traits within a bioenergetic context. These models quantify the energy allocated to various physiological processes, such as growth, maintenance, and reproduction, while considering the accumulation of contaminants and their impact on these functions.</p>
      <p>However, these DEBtox models are not currently suitable for amphipod crustaceans, for whom moulting is a vital process that regulates growth and reproduction throughout their life cycles. This study aims to demonstrate how the moulting process can be incorporated into the description of the physiology of <i>Gammarus fossarum</i>, a species commonly used to assess water quality. To this end, we have extended Kooijman's (2010) DEB theory by incorporating moulting and linking it to reproduction within the gammarid's physiology. This DEB model was calibrated using observational data, enabling the growth and reproduction of <i>G. fossarum</i> to be described under undisturbed conditions. The model can now be extended to investigate the effects of eight metals at different levels, such as feeding, maintenance, growth and reproduction (Martin et al., 2014).</p>
      <p><em>Keywords: DEB Theory, Gammarus fossarum, reproduction, molting process</em></p>
    </div>
  </details>
    </div>
  </div>

  <!-- Mar 2024 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/nowpas_logo.png" alt="Logo NOWPAS"></div>
    <div class="timeline-date">March 2024</div>
    <div class="timeline-event">International Workshop of PhDs and Post-doctoral Fellows on Anadromous Salmonids (NoWPaS)</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Unlocking the Drivers of Life-History Strategies in <i>Salmo trutta</i>: A Bioenergetic Modeling Approach</div>
      <div class="location">Cromarty, Scotland</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>Individuals subjected to environmental selection pressures adopt strategies to maximize their fitness within a specific environment. These adaptive strategies involve the selection of a set of life history traits (LHTs) under certain environmental conditions, reflecting an individual's ability to survive and reproduce; while also influencing the selection of specific phenotypes within a population. The coexistence of multiple LHTs, rather than the expression of a single trait, allows individuals to thrive in their environment, resulting in physiological differences and distinct life strategies: a phenomenon known as the Pace-of-Life Syndrome (POLS). According to POLS theory, those with a quick metabolism have faster development and reproduction, but they have shorter lifespans.</p>
      <p>The interplay between environmental conditions and genetics shapes the phenotypic expression of LHTs, leading to an interindividual phenotypic plasticity. This plasticity arises from an individual's ability to allocate energy to different physiological functions. Given the association between LHTs and POLS, to investigate the bioenergetic parameters influencing life-history strategies is crucial. </p>
      <p>This study aims to elucidate the connection between an organism's bioenergetic mechanisms and LHTs to predict POLS on <i>Salmo trutta</i>. For that, we used Dynamic Energy Budget (DEB) theory in order to simulate individuals with different bioenergetic predispositions in an optimal environment. This individual-based model allows us to quantify a set of LHTs (including growth, metabolic and reproduction rates) which can finally predict POLS. In essence, this research aims to get a holistic understanding on the adaptive responses of individuals facing selective pressures in the future.</p>
      <p><i>Keywords: Dynamic Energy Budget theory, Life-history traits, Salmo trutta, Pace-of-life syndroms</i></p>
    </div>
  </details>
    </div>
  </div>

  <!-- Jun 2023 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/DEB_logo.png" alt="Logo DEB"></div>
    <div class="timeline-date">June 2023</div>
    <div class="timeline-event">International Symposium on DEB Theory</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">An application of DEB theory to understand the co-variation of life-history traits in freshwater populations</div>
      <div class="location">Baton-Rouge, Louisiana, USA</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>There has been an increased interest in the effects of global change on freshwater populations, because of their close dependence on environmental factors for survival. Changes in those factors, acting as selective pressures, could lead to differences in individuals’ life-history. However, this adaptation might be restricted by evolutionary constraints due to the chemical and physical mechanisms at play and/or genetic correlation between traits. According to the Pace-of-Life-Syndrom theory (i.e. POLS), the correlated expression of a set of life-history traits (LHTs), constrained by individual bioenergetic characteristics, defines ”slow” or ”fast” strategies. Thus, the expression of a set of specific genes related to energy processing will lead to specific values of LHTs (growth and reproductive traits). The resulting correlation between these traits could limit possible evolutionary pathways in response to environmental changes. To understand how bioenergetic parameters could link different LHTs, we modelled energy allocation in two freshwater species (Daphnia magna and Salmo trutta) with the help of the Dynamic Energy Budget theory. We accounted for inter-individual differences by independently varying the value of primary parameters of the model under constant environmental conditions (optimal temperature and ad libitum food source). We then estimated the effect of this inter-individual variation on the correlations between several LHTs (Length, Lifespan, Age at Puberty, Reproductive Output and Respiration rate). This study of co-variation between traits provides clues to the actual evolutionary potential of LHTs in freshwater organisms.</p>
      <p><i>Keywords: Survival, Reproductive output, Metabolism, Individual based modelling, Pace of life Syndrom</i></p>
    </div>
  </details>
    </div>
  </div>

  <!-- May 2023 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/EMPSEB_logo.png" alt="Logo EMPSEB"></div>
    <div class="timeline-date">May 2023</div>
    <div class="timeline-event">European Meeting for PhD students in Evolutionary Biology (EMPSEB)</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Modelling bioenergetics to understand the co-variation of life-history traits in freshwater populations</div>
      <div class="location">Millport, Scotland</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>There has been an increased interest in understanding the effects of global change on freshwater populations. Changes in environment, acting as selective pressures, could lead to differences in the individuals’ life-history. However, this adaptation might be restricted by evolutionary constraints due to the chemical and physical mechanisms at play and/or genetic correlation between traits.</p>
      <p>According to the Pace-of-Life-Syndrom theory, the correlated expression of a set of life-history traits (LHTs) allows the individual to adopt a "slow" or a "fast" strategy. An individual’s bioenergetic characteristics, are partly determined by its environment, but also by its genotype. Thus, the expression of a set of specific genes could lead to specific values of LHTs. The resulting correlation between these traits will determine their ability to respond to selection.</p>
      <p>To understand how these bioenergetic parameters could link different LHTs, we modelled the energy allocation of individuals of two freshwater species. We accounted for inter-individual differences by independently varying the value of primary parameters of the model under constant environmental conditions. We then estimated the effect of this inter-individual variation on the correlations between several LHTs. This study of co-variation between traits provided a clue to the actual evolutionary potential of LHTs in freshwater organisms.</p>
    </div>
  </details>
    </div>
  </div>

  <!-- Mar 2023 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/nowpas_logo.png" alt="Logo NOWPAS"></div>
    <div class="timeline-date">March 2023</div>
    <div class="timeline-event">International Workshop of PhDs and Post-doctoral Fellows on Anadromous Salmonids (NoWPaS)</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Modelling bioenergetics to understand the co-variation of life-history traits in salmonids</div>
      <div class="location">Oslo / Drøbak, Norway</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>There has been an increased interest in understanding the effects of global change on salmonids, because of their close dependency of environmental factors for survival. The possible disturbances, acting as evolution pressures, could lead to differences in the life-history of individuals. According to the Pace-of-Life Syndrom-theory (i.e. POLS), the correlated expression of a set of life-history traits (LHTs) allows the individual to adopt a "slow" or a "fast" strategy, correlated to its metabolism. An individual bioenergetic characteristics, which underlie both metabolic rate and LHTs, are partly determined by its genotype. Thus individual variation in bioenergetic traits may determine the genetic covariance matrix between traits, generating evolutionary constraints. To understand how these bioenergetic parameters could relate to different LHTs, we modelled the energy allocation of individuals with the help of the Dynamic Energy Budget (DEB) theory. We accounted for inter-individual differences by independently varying the value of primary parameters of the model under constant environmental conditions (optimal temperature and ad libitum food source). We then estimated the effect of this inter-individual variation on several life-history traits, namely (1) maximal length and (2) weight reached during life, (3) lifespan (i.e. age at natural death from senescence), (4) age at puberty and (5) respiration rate (as a proxy of metabolic rate). Also, the study of co-variation between traits provided a clue to the actual evolutionary potential of LHTs in salmonids.</p>
      <p><i>Keywords: Life-History Traits, Metabolism, Individual-based modelling, Bioenergetics, DEB theory</i></p>
    </div>
  </details>
    </div>
  </div>

  <!-- Nov 2022 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/INRAE_logo.png" alt="Logo INRAE"></div>
    <div class="timeline-date">November 2022</div>
    <div class="timeline-event">JST LIFE (INRAE)</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Impact of global changes on freshwater populations: Use of the Dynamic Energy Budget model</div>
      <div class="location">Thonon-les-Bains, France</div>
    </div>
  </div>

  <!-- Mar 2022 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/nowpas_logo.png" alt="Logo NOWPAS"></div>
    <div class="timeline-date">March 2022</div>
    <div class="timeline-event">International Workshop of PhDs and Post-doctoral Fellows on Anadromous Salmonids (NoWPaS)</div>
    <div class="timeline-card">
      <span class="tag">Oral Presentation</span>
      <div class="title">Impact of global changes on salmonids population: use of the DEB model</div>
      <div class="location">Saint-Etienne-de-Baïgorry, France</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>During the last decades, it exists an increased interest in understanding the impacts of global change and anthropic disturbances on ecosystems. This global change impact freshwater ecosystem in several dimensions. One of them is the alteration of temperature cycle, a strong consequence for freshwater species like Salmonides, which are endotherms so directly mediated by temperature variations. In addition, extreme precipitations can interfere with river flows and create hypoxia events. Environmental variations also cause a phase shift between multiple trophic levels in a river, so a disturbance on access to food, causing a starvation for the species. These disturbances, which act like evolution pressures, create a vulnerability in an individual due to its physiological limits or its life-history characteristics. In this case, the organism has to choose for a strategy: to allocate its energy for reproduction, at the expense of its life, or survival, and waiting for better conditions to breed. The Dynamic Energy Budget model is a good tool to understand how a fluctuant environment can interfere on the individual physiology, quantifying the energy with a simple system of equations. The first aim of my PhD research work is to develop an individual-based DEB model for <i>Daphnia magna</i>, and extend it to Salmo trutta in a second time. Then I confront my individual to different scenarios: (1) in ideal conditions, (2) with temperature fluctuations, (3) under starvation and (4) with hypoxia. This model helps to understand what are the mechanisms used by the individual for the adaptation to global changes.</p>
      <p><i>Keywords: global change, salmonids, DEB theory, evolutionnary constraints</i></p>
    </div>
  </details>
    </div>
  </div>

  <!-- Jun 2019 -->
  <div class="timeline-item">
    <div class="timeline-logo"><img src="/assets/img/CBI_logo.png" alt="Logo CBI"></div>
    <div class="timeline-date">June 2019</div>
    <div class="timeline-event">19ème Colloque de Biologie de l'Insecte (CBI)</div>
    <div class="timeline-card">
      <span class="tag poster">Poster Presentation</span>
      <div class="title">Temperature dynamics in ant nests: observation, characterisation and theoretical framework</div>
      <div class="location">Albi, France</div>
      <details>
    <summary>Show Abstract</summary>
    <div class="abstract-text">
      <p>The nest constructed by social insects features a complex architecture that varies significantly across species. It emerges self-organized from the collective activity of insects, driven by local interactions both among individuals and between individuals and their environment. This nest protects the colony against fluctuating and often hostile environmental conditions, notably providing thermal homeostasis. This regulation is achieved either actively, through individual behavior, or passively, via the physicochemical properties of the materials used. We investigate the spatiotemporal dynamics of temperature in nests of the Lasius niger black garden ant. This species builds epigeal mounds up to 0.5 m high enclosing a complex network of galleries. Does this architecture alter the spatiotemporal temperature dynamics? To address this question, we conducted field measurements of temperature dynamics at various depths within the nest itself, a soil mound of identical dimensions, and the surrounding ground. We first observe that epigeal nests are on average warmer than the surrounding ground while retaining the buffering effect of depth to dampen daily temperature fluctuations.We then confront the theoretical framework of heat diffusion with our empirical measurements to finely characterize these spatiotemporal dynamics using the thermal diffusivity coefficient. We find that the spatiotemporal dynamics are generally consistent with predictions from the heat equation. The thermal diffusivity coefficient is identical between nests and control soil mounds, but appears to differ from that of the surrounding ground. Finally, we discuss the ecological relevance of these findings, highlight the limitations of our methodology, and suggest improvements for future sampling campaigns.</p>
    </div>
  </details>
    </div>
  </div>

</div>