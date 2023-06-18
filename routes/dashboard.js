const express = require("express");
const response = require('../response');
const { TaskModel, TaskProgressModel, EmployeeModel } = require("../models");
const { sequelize } = require("../services/db");
const router = express.Router(express.json());

router.get("/dashprocrastination", async (req, res) => {
    const result = await sequelize.query(`
  SELECT
    c.*,
    d.employee_name 
  FROM
    (
      SELECT
        b.employee_id,
        CASE
			
			WHEN AVG( d3 ) BETWEEN '0' 
			AND '33,3332' THEN
				'Rendah' 
				WHEN AVG( d3 ) BETWEEN '33,333' 
				AND '66,6666' THEN
					'Sedang' ELSE 'Tinggi' 
				END cat,
        AVG(d3) prokastinasi
      FROM
        (
          SELECT
            a.employee_id,
            IFNULL(((a.d2 / a.d1) * 100), 0) d3 
          FROM
            (
              SELECT
                a.employee_id,
                a.task_date,
                a.task_deadline,
                b.task_progressdate,
                (DATE(a.task_deadline) - DATE(a.task_date)) AS d1,
                (DATE(b.task_progressdate) - DATE(a.task_date)) AS d2 
              FROM
                task a
                JOIN task_progress b ON a.task_id = b.task_id 
                AND b.task_progressstatus = 2 
            ) a 
        ) b 
      GROUP BY
        b.employee_id 
    ) c
    LEFT JOIN m_employee d ON d.employee_id = c.employee_id ORDER BY c.prokastinasi DESC LIMIT 5;
`);
return response(200, result[0], res)

});

router.get("/dashproductivity", async (req, res) => {
  const result = await sequelize.query(`
SELECT
  c.*,
  d.employee_name 
FROM
  (
    SELECT
      b.employee_id,
      CASE
    
    WHEN AVG( d3 ) BETWEEN '0' 
    AND '33,3332' THEN
      'Rendah' 
      WHEN AVG( d3 ) BETWEEN '33,333' 
      AND '66,6666' THEN
        'Sedang' ELSE 'Tinggi' 
      END cat,
      AVG(d3) prokastinasi
    FROM
      (
        SELECT
          a.employee_id,
          IFNULL(((a.d2 / a.d1) * 100), 0) d3 
        FROM
          (
            SELECT
              a.employee_id,
              a.task_date,
              a.task_deadline,
              b.task_progressdate,
              (DATE(a.task_deadline) - DATE(a.task_date)) AS d1,
              (DATE(b.task_progressdate) - DATE(a.task_date)) AS d2 
            FROM
              task a
              JOIN task_progress b ON a.task_id = b.task_id 
              AND b.task_progressstatus = 2 
          ) a 
      ) b 
    GROUP BY
      b.employee_id 
  ) c
  LEFT JOIN m_employee d ON d.employee_id = c.employee_id ORDER BY c.prokastinasi ASC LIMIT 5;
`);
return response(200, result[0], res)

});

// to kepsek
router.get("/dashprojects", async (req, res) => {
  const project_div = req.query.project_div;
  const result = await sequelize.query(`SELECT
	IFNULL(done,0) done, 
	IFNULL(total,0) total,
	project_div, division_id, division_name
FROM
	(
	SELECT
  (select COUNT(IFNULL(project_id,0)) as done from project where project_status = 2) as done, 
  (select COUNT(IFNULL(project_id,0)) as total from project) as total, 
  IFNULL(project_div,0) as project_div, division_id, division_name

FROM
  project a RIGHT JOIN m_division b on a.project_div = b.division_id
	)a 
	GROUP BY division_id`);
  return response(200, result[0], res)
});

// to kadiv
router.get("/dashproject", async (req, res) => {
  const project_div = req.query.project_div;
  const result = await sequelize.query(`SELECT
	IFNULL(non_progress,0) nonprogress, 
	IFNULL(in_progress,0) inprogress, 
	IFNULL(done,0) done, 
	IFNULL(pending,0) pending,
	project_div,
  division_id, division_name
FROM
	(
	SELECT
		(select COUNT(IFNULL(project_id,0)) as non_progress from project where project_div = `+ project_div +` and project_status = 0) non_progress,
		(select COUNT(IFNULL(project_id,0)) as in_progress from project where project_div = `+ project_div +` and project_status = 1) as in_progress,
		(select COUNT(IFNULL(project_id,0)) as done from project where project_div = `+ project_div +` and project_status = 2) as done,
		(select COUNT(IFNULL(project_id,0)) as pending  from project where project_div = `+ project_div +` and project_status = 3) as pending, IFNULL(project_div,0) as project_div, 
    division_id, b.division_name

FROM
  project a RIGHT JOIN m_division b on a.project_div = b.division_id
	)a WHERE division_id = `+ project_div +`
	GROUP BY division_id`);
  return response(200, result[0], res)
});

// kadiv tasks : all task assigned by kadiv
router.get("/dashtasks", async (req, res) => {
  const employee_id = req.query.user_id;
  const result = await sequelize.query(`SELECT
	a.non_progres,
a.in_progres,
a.done,
a.pending,
IFNULL( a.user_id, 0 ) user_id
FROM
	(
	SELECT
		( SELECT count( IFNULL( task_id, 0 )) AS progress FROM task WHERE task_status = 0 AND user_id = `+ employee_id +` ) non_progres,
		( SELECT count( IFNULL( task_id, 0 )) AS progress FROM task WHERE task_status = 1 AND user_id = `+ employee_id +` ) in_progres,
		( SELECT count( IFNULL( task_id, 0 )) AS done FROM task WHERE task_status = 2 AND user_id = `+ employee_id +` ) done,
		( SELECT count( IFNULL( task_id, 0 )) AS pending FROM task WHERE task_status = 3 AND user_id = `+ employee_id +` ) pending , 
		a.employee_id, b.user_id

FROM
	/*task*/
  m_employee a LEFT JOIN task b on a.employee_id = b.user_id 
	)a WHERE employee_id = `+ employee_id +`
GROUP BY user_id`);
  return response(200, result[0], res)
});

// employee tasks : only task per session login
router.get("/dashtask", async (req, res) => {
  const employee_id = req.query.employee_id;
  const result = await sequelize.query(`SELECT
	* 
FROM
	(
	SELECT
		( SELECT count( IFNULL( task_id, 0 )) AS progress FROM task WHERE task_status = 0 AND employee_id =`+ employee_id +` ) non_progres,
		( SELECT count( IFNULL( task_id, 0 )) AS progress FROM task WHERE task_status = 1 AND employee_id =`+ employee_id +` ) in_progres,
		( SELECT count( IFNULL( task_id, 0 )) AS done FROM task WHERE task_status = 2 AND employee_id = `+ employee_id +` ) done,
		( SELECT count( IFNULL( task_id, 0 )) AS pending FROM task WHERE task_status = 3 AND employee_id = `+ employee_id +` ) pending , 
    a.employee_id

FROM
	/*task*/
  m_employee a LEFT JOIN task b on a.employee_id = b.employee_id 
	)a WHERE employee_id = `+ employee_id +` 
GROUP BY employee_id`);
  return response(200, result[0], res)
});

module.exports = router; 