[Unit]
   * name : string
   * health : number
   * attack : number
   * defense : number
   * speed : number
   * actions : list of [Action]

[Party]
   * members : array

[Action]
   Each action will be it's own function object.

   [Attack]
      must take a Unit actor.


[Action Queue] - priority queue based on time / speed?
   Everything is an action, including decision-making (user input?)

   Turn:    QUEUE
   First: { Keine-decide: 0 | Monster2-decide: 1 | Monster1-decide: 2 | Ares-decide: 3 }

   Second: { Monster2-decide: 0 | Keine-attack: 0 | Monster1-decide: 1 | Ares-decide: 2 }

   Third: { Keine-attack: 0 | Monster2-attack: 0 | Monster1-decide: 0 | Ares-decide: 1 }

   Fourth: { Monster2-attack: 0 | Monster1-decide: 0 | Ares-decide: 0 | Keine-decide: 4 }

   Fifth: { Monster1-decide: 0 | Ares-decide: 0 | Keine-decide: 3 | Monster2-decide: 5 }

   Sixth: { Ares-decide: 0 | Keine-decide: 2 | Monster1-ability: 3 | Monster2-decide: 4 }


[Turn]

[Status]
   * effect

[Grid]

[Allies] [Ally]

[Foes] [Foe]
