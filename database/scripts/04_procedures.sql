USE omnilog_hub;

DROP PROCEDURE IF EXISTS sp_movimentar_estoque;

DELIMITER $$

CREATE PROCEDURE sp_movimentar_estoque(
    IN p_armazem_id BIGINT UNSIGNED,
    IN p_produto_id BIGINT UNSIGNED,
    IN p_usuario_id BIGINT UNSIGNED,
    IN p_tipo VARCHAR(10),
    IN p_quantidade INT,
    IN p_motivo VARCHAR(255)
)
BEGIN
    DECLARE v_linhas INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    IF p_tipo NOT IN ('entrada', 'saida') THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Tipo deve ser entrada ou saida';
    END IF;

    IF p_quantidade IS NULL OR p_quantidade <= 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Quantidade deve ser maior que zero';
    END IF;

    START TRANSACTION;

    IF p_tipo = 'entrada' THEN
        UPDATE estoque
        SET quantidade = quantidade + p_quantidade
        WHERE armazem_id = p_armazem_id
          AND produto_id = p_produto_id;

        SET v_linhas = ROW_COUNT();

        IF v_linhas = 0 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Registro de estoque nao encontrado';
        END IF;

    ELSE
        UPDATE estoque
        SET quantidade = quantidade - p_quantidade
        WHERE armazem_id = p_armazem_id
          AND produto_id = p_produto_id
          AND quantidade >= p_quantidade;

        SET v_linhas = ROW_COUNT();

        IF v_linhas = 0 THEN
            SIGNAL SQLSTATE '45000'
                SET MESSAGE_TEXT = 'Estoque inexistente ou insuficiente';
        END IF;
    END IF;

    INSERT INTO movimentacoes_estoque
        (armazem_id, produto_id, usuario_id, tipo, quantidade, motivo)
    VALUES
        (p_armazem_id, p_produto_id, p_usuario_id,
         p_tipo, p_quantidade, p_motivo);

    COMMIT;
END$$

DELIMITER ;
