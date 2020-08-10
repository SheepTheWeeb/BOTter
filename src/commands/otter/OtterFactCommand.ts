import Command from '../Command';
import { emojiLookup } from './../../app';

const otterfacts: Array<string> = [
  'An otter shits 5 times a year.',
  'California’s southern sea otter has been listed as a threatened species under the Endangered Species Act since 1977.',
  'Currently the southern sea otter population is estimated at just above 3,000 animals.',
  'Sea otters play a vital role in the health and stability of the nearshore marine ecosystem as a keystone species',
  'Sea otter fur is the densest of any mammal at about 1 million hairs per square inch (We have 100,000 hairs on our entire head).',
  'Wild sea otters typically have a lifespan between 15 and 20 years.',
  'Average weight of an adult female California sea otter is about 50 lbs. Males can weigh up to 70 lbs.',
  'Average length of an adult California sea otter is about 4 ft.',
  'A group of sea otters resting together is called a raft.',
  'Sea otters are known to wrap their pups and themselves in kelp to keep from drifting out to sea.',
  'Newborn sea otter pups are so buoyant they can’t immediately dive for food. Pups begin to dive and forage at about 2 months.',
  'Sea otter moms typically nurse and care for their pups for about 6 months before weaning them.',
  'Sea otter moms typically only give birth to 1 pup. Gestation is 6 months (2 months delayed implantation + 4 months pregnancy).',
  'Is there a pupping season? Nope. Pups are born year round.',
  'Have you ever seen an otter with a scarred or bloody nose? That’s because a male sea otter bites a female’s nose to hold onto her during mating.',
  'Sea otters have no blubber so they constantly groom themselves to maintain the insulating & water repellant properties of their fur.',
  'An otter must consume 25% of its bodyweight in prey each day just to stay alive (for a 75 lb kid, that’s 75 1/4 lb burgers!).',
  'Sea otters spend approximately 9 to 12 hours foraging each day.',
  'On average, an adult male California sea otter consumes over 4,000 calories daily.',
  'Sea otters eat many kinds of invertebrates, including sea urchins, abalone, clams, crabs, snails, sea stars, squid & octopuses.',
  'Sea otters are one of the few animals that use tools. After hunting on the seafloor, sea otters return to the surface to eat. Floating on its back and using its chest as a table, a sea otter often uses a rock to crack open its prey — especially if dinner is a crab, clam or mussel.',
  'Most common prey for California sea otters are Rock and Dungeness crabs.',
  'Unlike northern sea otters found in Alaska, southern sea otters here in California don’t eat fish.',
  'Average dive duration for California sea otters is about 60 seconds. Longest dive ever recorded was just under 8 minutes.',
  'Average dive depth for California sea otters is about 20 feet. Deepest dive recorded is 264 feet.',
  'Sea otters primarily rely on their sense of touch (whiskers and forepaws) in murky waters to locate prey.',
  'Sea otters have built in pouches of loose skin under their forearms to stash extra prey when diving.',
  'Sea otters eat sea urchins & other invertebrates that graze on giant kelp. No sea otters, no kelp forests.',
  'Sea otters are equally active both night and day.',
  'White shark bites are now the leading cause of sea otter mortality in California.',
  'Large percentage of southern sea otter mortality is due to infectious diseases, many of which are known to have anthropogenic causes.',
  'Threats to population recovery include white sharks, pathogens & parasites, food limitation, coastal pollutants and oil spills.'
];

/**
 * Tells you a random otterfact
 */
export default class OtterFactCommand extends Command {
  facts: Array<string>;

  constructor() {
    super(
      'fact',
      ['otterfact'],
      'Gives random otter fact.',
      `${process.env.PREFIX}fact`,
      true
    );
    this.facts = otterfacts;
  }

  async execute(msg: any) {
    // check if command is enabled
    if (!this.enabled) {
      console.log(`Command '${this.name}' is disabled but still called.`);
      return;
    }

    msg.channel.send(this.facts[Math.floor(Math.random() * this.facts.length)]);

    // react with otter-handsup
    try {
      msg.react(emojiLookup.get('HANDSUP'));
    } catch (ex) {
      throw Error(`Reaction failed because of: ${ex.message}`);
    }
  }
}
