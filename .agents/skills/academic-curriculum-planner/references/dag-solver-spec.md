# DAG Solver & Constraint Specification

This reference details the mathematical and algorithmic constraints governing the UFRGS Organogramas Curriculares simulators.

---

## 1. Mathematical Model

Let the curriculum be represented as a Directed Acyclic Graph (DAG):
$$G = (V, E)$$

Where:
- $V = \{ c_1, c_2, \dots, c_n \}$ is the set of all course activities.
- $E \subset V \times V$ is the set of directed prerequisite edges. An edge $(u, v) \in E$ indicates that course $u$ is an immediate prerequisite of course $v$ ($u \in \text{Prereqs}(v)$).

### Constraint 1: Strict Temporal Precedence
For every course allocation function $S: V \to \mathbb{N}^+$ mapping a course to its scheduled semester:
$$\forall (u, v) \in E, \quad S(v) > S(u)$$

### Constraint 2: Minimum Completed Credits Barrier
Each course $v \in V$ may have a minimum completed credits requirement $M(v) \ge 0$.
Let $C(u) \in \mathbb{N}^+$ denote the academic credit weight of course $u$.
The cumulative credits available to course $v$ in semester $S(v)$ is given strictly by courses allocated to earlier semesters:
$$\text{AccCredits}(v) = \sum_{\{ u \in V \mid S(u) < S(v) \}} C(u)$$

A valid allocation requires:
$$\text{AccCredits}(v) \ge M(v)$$

If $\text{AccCredits}(v) < M(v)$, the UI marks the course with:
- Border highlight: `.card-credit-warning` (amber border `#f59e0b` and glow).
- Badge: `<span class="badge badge-credit-req badge-credit-warning">🔒 Requer M(v) cr; Atual: AccCredits(v)</span>`.
- During automated cascade or drag-and-drop, the solver pushes $v$ forward to the earliest semester where $\text{AccCredits}(v) \ge M(v)$.

### Constraint 3: Semester Parity / Periodicity
Each course $v \in V$ may have an offering periodicity $P(v) \in \{ \text{null}, 1, 2 \}$:
- $P(v) = 1$: Offered exclusively in odd semesters ($S(v) \equiv 1 \pmod 2$).
- $P(v) = 2$: Offered exclusively in even semesters ($S(v) \equiv 0 \pmod 2$).
- $P(v) = \text{null}$: Offered in all semesters.

If $P(v) \neq \text{null}$ and $S(v) \not\equiv P(v) \pmod 2$, a parity warning is raised or the course is automatically adjusted to the next semester matching $P(v)$.

---

## 2. Dynamic Topological BFS Cascade Algorithm

When a user drags course $u$ to target semester $S_{\text{new}}$ such that $S_{\text{new}} \ge S(v)$ for some downstream dependent $v$, the simulator triggers a cascade push:

```javascript
function cascadeMove(courseCode, targetSemester, allocations, adjList, courseCatalog) {
  const queue = [[courseCode, targetSemester]];
  const visited = new Set();

  while (queue.length > 0) {
    const [currentCode, currentSem] = queue.shift();
    if (visited.has(currentCode)) continue;
    visited.add(currentCode);

    const dependents = adjList[currentCode] || [];
    for (const depCode of dependents) {
      const depAlloc = allocations[depCode];
      if (depAlloc && depAlloc.semester !== null) {
        let earliestAllowedSem = currentSem + 1;

        // Verify periodicity (/1 or /2)
        const depPeriod = courseCatalog[depCode]?.periodicidade;
        if (depPeriod === '/1' && earliestAllowedSem % 2 === 0) {
          earliestAllowedSem += 1;
        } else if (depPeriod === '/2' && earliestAllowedSem % 2 !== 0) {
          earliestAllowedSem += 1;
        }

        // Verify credit barrier
        const minCreds = courseCatalog[depCode]?.min_credits || 0;
        if (minCreds > 0) {
          while (earliestAllowedSem <= 50 && calculateAccumulatedCredits(earliestAllowedSem, allocations) < minCreds) {
            earliestAllowedSem++;
          }
        }

        if (depAlloc.semester < earliestAllowedSem) {
          depAlloc.semester = earliestAllowedSem;
          queue.push([depCode, earliestAllowedSem]);
        }
      }
    }
  }
}
```

---

## 3. Buffer Column & Canvas Overflow Rules

1. **Dynamic $S_{\max} + 1$ Visibility:**
   Let $S_{\max} = \max_{v \in V_{\text{allocated}}} S(v)$.
   The canvas must always render at least $S_{\max} + 1$ columns. This guarantees there is always an empty, dashed drop-target column for future forward scheduling.
2. **Semester 20+ Overflow Flag:**
   For any column $j \ge 20$, the UI applies `.column-overflow` styling (subtle crimson border `#7F1D1D` and darkened red card backdrop `#241217`) indicating extended academic trajectory without locking the canvas or corrupting state.
