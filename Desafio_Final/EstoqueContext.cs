using System;
using System.Collections.Generic;
using Desafio_Final.Models;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Final;

public partial class EstoqueContext : DbContext
{
    public EstoqueContext()
    {
    }

    public EstoqueContext(DbContextOptions<EstoqueContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Estoque> Estoques { get; set; }

    public virtual DbSet<LogEntradaSaida> LogEntradaSaida { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost; initial Catalog=ESTOQUE;User ID=Fernando;password=senha1234;language=Portuguese;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Estoque>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Estoque__3214EC2735EEED1D");

            entity.ToTable("Estoque");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Fabricante)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.NomeProduto)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.PrecoUnitario).HasColumnType("decimal(10, 2)");
        });

        modelBuilder.Entity<LogEntradaSaida>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LogEntra__3214EC2701762DFB");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DataMovimento).HasColumnType("datetime");
            entity.Property(e => e.ProdutoId).HasColumnName("ProdutoID");
            entity.Property(e => e.TipoMovimento)
                .HasMaxLength(10)
                .IsUnicode(false);

            entity.HasOne(d => d.Produto).WithMany(p => p.LogEntradaSaida)
                .HasForeignKey(d => d.ProdutoId)
                .HasConstraintName("FK__LogEntrad__Produ__534D60F1");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3214EC271DD178ED");

            entity.ToTable("Usuario");

            entity.HasIndex(e => e.NomeUsuario, "UQ__Usuario__06940B9AFA50FF32").IsUnique();

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Cpf)
                .HasMaxLength(14)
                .IsUnicode(false)
                .HasColumnName("CPF");
            entity.Property(e => e.DataNascimento).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NomeCompleto)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.NomeUsuario)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Senha)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
