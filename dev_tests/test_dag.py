"""
Suíte de Testes Automatizados em Python: Validação do Grafo Acíclico Dirigido (DAG)
Engenharia de Controle e Automação - UFRGS
"""

import os
import json
import unittest

class TestCurriculumDAG(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        data_path = os.path.join(base_dir, 'curriculum_data.json')
        cls.assertTrue(os.path.exists(data_path), f"Arquivo não encontrado: {data_path}")
        with open(data_path, 'r', encoding='utf-8') as f:
            cls.curriculum = json.load(f)
        cls.courses = cls.curriculum['disciplinas']
        cls.all_codes = set(cls.courses.keys())
        
        # Constrói mapas DAG
        cls.prereq_map = {code: list(cls.courses[code].get('prerequisitos', [])) for code in cls.all_codes}
        cls.dependent_map = {code: [] for code in cls.all_codes}
        for code, prereqs in cls.prereq_map.items():
            for p in prereqs:
                if p in cls.dependent_map:
                    cls.dependent_map[p].append(code)

    def create_default_allocations(self):
        alloc = {}
        for code, data in self.courses.items():
            etapa = data.get('etapa_sugerida')
            alloc[code] = {
                'semester': etapa if (etapa and 1 <= etapa <= 10) else None,
                'completed': False,
                'has_overflow': False
            }
        return alloc

    def solve_move(self, alloc, course_code, target_semester):
        if target_semester is None:
            alloc[course_code]['semester'] = None
            alloc[course_code]['has_overflow'] = False
            return {'cascaded': []}

        # Ajuste a montante
        max_prereq_sem = 0
        for p in self.prereq_map.get(course_code, []):
            p_alloc = alloc.get(p)
            if p_alloc and p_alloc['semester'] is not None and not p_alloc['completed']:
                if p_alloc['semester'] > max_prereq_sem:
                    max_prereq_sem = p_alloc['semester']

        adjusted = target_semester
        if max_prereq_sem > 0 and target_semester <= max_prereq_sem:
            adjusted = max_prereq_sem + 1

        alloc[course_code]['semester'] = adjusted
        alloc[course_code]['has_overflow'] = adjusted > 20

        # Propagação BFS
        queue = [course_code]
        cascaded = []
        visited = {course_code}

        while queue:
            curr = queue.pop(0)
            curr_sem = alloc[curr]['semester']
            if curr_sem is None:
                continue

            for dep in self.dependent_map.get(curr, []):
                dep_alloc = alloc.get(dep)
                if dep_alloc and dep_alloc['semester'] is not None:
                    if dep_alloc['semester'] <= curr_sem:
                        new_sem = curr_sem + 1
                        dep_alloc['semester'] = new_sem
                        dep_alloc['has_overflow'] = new_sem > 20
                        if dep not in cascaded:
                            cascaded.append(dep)
                        queue.append(dep)

        return {'cascaded': cascaded, 'adjusted': adjusted}

    def check_violations(self, alloc):
        violations = []
        for code, a in alloc.items():
            if a['semester'] is not None and not a['completed']:
                for p in self.prereq_map.get(code, []):
                    p_alloc = alloc.get(p)
                    if p_alloc and p_alloc['semester'] is not None and not p_alloc['completed']:
                        if a['semester'] <= p_alloc['semester']:
                            violations.append((code, p, a['semester'], p_alloc['semester']))
        return violations

    def test_01_referential_integrity(self):
        """Verifica que nenhum pré-requisito aponta para código inexistente."""
        missing = []
        for code, prereqs in self.prereq_map.items():
            for p in prereqs:
                if p not in self.all_codes:
                    missing.append((code, p))
        self.assertEqual(len(missing), 0, f"Pré-requisitos ausentes no catálogo: {missing}")

    def test_02_default_curriculum_acyclic(self):
        """Verifica que a grade padrão da UFRGS é 100% válida e sem violações."""
        alloc = self.create_default_allocations()
        violations = self.check_violations(alloc)
        self.assertEqual(len(violations), 0, f"Violações na grade padrão: {violations}")

    def test_03_multilevel_cascade_propagation(self):
        """Verifica propagação em cascata de múltiplos níveis."""
        alloc = self.create_default_allocations()
        # Move Cálculo I para o semestre 3
        res = self.solve_move(alloc, 'MAT01353', 3)
        self.assertGreater(len(res['cascaded']), 0, "Deveria haver disciplinas empurradas")
        self.assertGreater(alloc['MAT01354']['semester'], 3, "Cálculo II deve estar após Semestre 3")
        self.assertGreater(alloc['MAT01167']['semester'], alloc['MAT01354']['semester'])
        violations = self.check_violations(alloc)
        self.assertEqual(len(violations), 0, "Não deve haver violações após propagação em cascata")

    def test_04_upstream_clamp(self):
        """Verifica correção automática ao mover disciplina para antes do pré-requisito."""
        alloc = self.create_default_allocations()
        # Tenta colocar MAT01354 (Cálculo II) no semestre 1
        res = self.solve_move(alloc, 'MAT01354', 1)
        self.assertEqual(res['adjusted'], 2, "Cálculo II deve ser ajustado para Semestre 2")
        self.assertGreater(alloc['MAT01354']['semester'], alloc['MAT01353']['semester'])

    def test_05_overflow_barrier_20th_semester(self):
        """Verifica tratamento gracioso quando a cadeia ultrapassa o 20º semestre."""
        alloc = self.create_default_allocations()
        # Empurra Cálculo I para o semestre 19
        self.solve_move(alloc, 'MAT01353', 19)
        overflow_courses = [code for code, a in alloc.items() if a.get('has_overflow')]
        self.assertGreater(len(overflow_courses), 0, "Deve haver cursos marcados com overflow")
        violations = self.check_violations(alloc)
        self.assertEqual(len(violations), 0, "Ordem cronológica estrita deve ser preservada no overflow")

if __name__ == '__main__':
    print("Iniciando testes unitários Python do DAG Solver...")
    unittest.main(verbosity=2)
