# DAG Solver & Constraint Specification

This reference details the mathematical and algorithmic constraints governing the UFRGS Trajetória Acadêmica simulators.

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
The cumulative credits available to course $v$ in semester $S(v)$ is given by:
$$\text{AccCredits}(v) = \sum_{\{ u \in V \mid S(u) < S(v) \}} C(u)$$

A valid allocation requires:
$$\text{AccCredits}(v) \ge M(v)$$

If $\text{AccCredits}(v) < M(v)$, the allocation is flagged as an invalid barrier violation.

### Constraint 3: Semester Parity / Periodicity
Each course $v \in V$ may have an offering periodicity $P(v) \in \{ \text{null}, 1, 2 \}$:
- $P(v) = 1$: Offered exclusively in odd semesters ($S(v) \equiv 1 \pmod 2$).
- $P(v) = 2$: Offered exclusively in even semesters ($S(v) \equiv 0 \pmod 2$).
- $P(v) = \text{null}$: Offered in all semesters.

If $P(v) \neq \text{null}$ and $S(v) \not\equiv P(v) \pmod 2$, a parity warning is raised.

---

## 2. Dynamic Topological BFS Cascade Algorithm

When a user drags course $u$ to target semester $S_{\text{new}}$ such that $S_{\text{new}} \ge S(v)$ for some downstream dependent $v$, the simulator triggers a cascade push:

```javascript
function cascadeDownstream(rootCode, targetSemester, allocations, adjList) {
  // Queue stores pairs of [courseCode, requiredMinSemester]
  const queue = [[rootCode, targetSemester]];
  const visited = new Set();

  while (queue.length > 0) {
    const [currentCode, currentSem] = queue.shift();
    const dependents = adjList[currentCode] || [];

    for (const depCode of dependents) {
      const depSem = allocations[depCode];
      if (depSem !== undefined) {
        const earliestAllowedSem = currentSem + 1;
        if (depSem < earliestAllowedSem) {
          allocations[depCode] = earliestAllowedSem;
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
   The canvas must always render at least $S_{\max} + 1$ columns. This guarantees there is always an empty, droppable target column for future scheduling.
2. **Semester 20+ Overflow Flag:**
   For any column $j \ge 20$, the UI applies `.column-overflow` styling (subtle crimson border `#7F1D1D` and darkened red card backdrop `#241217`) indicating extended academic trajectory without locking the canvas.
